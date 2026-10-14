import {handleStudyHelper} from './study-helper-backend.js';
export {StudyHelperQuota} from './study-helper-backend.js';
const CHAT_PATH = "/api/chat";
const MAX_NAME = 32;
const MAX_MESSAGE = 500;
const MAX_STORED_MESSAGES = 100;
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
const SESSION_WINDOW_MS = 30 * 1000;
const SESSION_MAX_MESSAGES = 5;
const ROOM_WINDOW_MS = 60 * 1000;
const ROOM_MAX_MESSAGES = 40;

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/study-helper' || url.pathname === '/api/study-helper/status') return handleStudyHelper(request, env);
    const room = env.TRAFFIC_ROOM.get(env.TRAFFIC_ROOM.idFromName("academic-hub-owner-traffic"));
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin/")) {
      if (!["/admin/login", "/admin/traffic", "/api/admin/login", "/api/admin/logout", "/api/admin/traffic", "/api/admin/session", "/api/admin/results"].includes(url.pathname)) return json({error:"Not found"},404);
      if (request.method === "POST" && request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      if (url.pathname === "/admin/login" && request.method === "GET") return adminPage(false);
      if (typeof env.ADMIN_PASSWORD !== "string" || !env.ADMIN_PASSWORD) return json({error:"The active Worker is missing its ADMIN_PASSWORD runtime secret."},503);
      if (env.ADMIN_PASSWORD.length < 16) return json({error:"The saved ADMIN_PASSWORD is shorter than 16 characters. Update the runtime secret to a longer password."},503);
      if (url.pathname === "/api/admin/results") {
        if (request.method !== "GET") return json({error:"Method not allowed."},405);
        const session = await room.fetch(await adminRequest(request, env, "https://internal/admin/api/admin/session"));
        if (!session.ok) return session;
        return fetchMockTestResults(env);
      }
      const result = await room.fetch(await adminRequest(request, env, "https://internal/admin" + url.pathname));
      if (url.pathname === "/admin/traffic" && request.method === "GET") {
        return result.ok ? adminPage(true) : new Response(null,{status:303,headers:{Location:"/admin/login","Cache-Control":"no-store"}});
      }
      return result;
    }
    if (url.pathname === CHAT_PATH) {
      if (request.method !== "GET" && request.method !== "POST") return json({error:"Method not allowed."},405);
      const chat = env.CHAT_ROOM.get(env.CHAT_ROOM.idFromName("ba-sociology-semester-chat"));
      return chat.fetch(request);
    }
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/internal/")) return json({error:"Not found"},404);
    let response = await env.ASSETS.fetch(request);
    if (request.method === "GET" && response.ok && response.headers.get("Content-Type")?.includes("text/html")) {
      const task = room.fetch(new Request("https://internal/internal/visit", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ip:request.headers.get("CF-Connecting-IP") || "Unavailable",path:url.pathname,country:request.cf?.country || "XX",region:request.cf?.region || "",city:request.cf?.city || ""})})).catch(()=>{});
      ctx.waitUntil(task);
      const session = await room.fetch(await adminRequest(request, env, "https://internal/admin/api/admin/session"));
      if (session.ok) {
        response = new HTMLRewriter().on("body",{element(el){el.append('<a href="/admin/traffic" style="position:fixed;bottom:20px;right:20px;z-index:9999;padding:12px 18px;background:#173b35;color:white;border-radius:12px;text-decoration:none;font:600 16px system-ui">Traffic ↗</a>',{html:true});}}).transform(response);
      }
      response = new Response(response.body,response);
      response.headers.set("Cache-Control","private, no-store");
      response.headers.set("Vary","Cookie");
    }
    return response;
  }
};

export class StudyHubChat {
  constructor(state, env) {
    this.env = env;
    this.state = state;
    this.sessionRates = new Map();
    this.roomRate = [];
    this.serial = Promise.resolve();
  }

  fetch(request) {
    const response = this.serial.then(() => this.handle(request));
    this.serial = response.then(() => undefined, () => undefined);
    return response;
  }

  async handle(request) {
    const now = Date.now();
    const path = new URL(request.url).pathname;
    if (path.startsWith('/admin/') || path === '/internal/visit') return this.handleAdmin(request, path, now);
    const stored = (await this.state.storage.get("messages")) || [];
    const recent = stored.filter((message) =>
      Number.isFinite(message.createdAt) && message.createdAt > now - RETENTION_MS
    );

    if (request.method === "GET") {
      if (recent.length !== stored.length) {
        await this.state.storage.put("messages", recent);
      }
      return json({ messages: recent });
    }

    let input;
    try {
      input = await request.json();
    } catch {
      return json({ error: "Enter a valid message." }, 400);
    }

    const name = cleanText(input.name, MAX_NAME);
    const text = cleanText(input.text, MAX_MESSAGE);
    const sessionId = typeof input.sessionId === "string" ? input.sessionId : "";
    if (!name) return json({ error: "Enter your name." }, 400);
    if (!text) return json({ error: "Enter a message." }, 400);
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(sessionId)) {
      return json({ error: "Refresh the page and try again." }, 400);
    }

    const sessionTimes = (this.sessionRates.get(sessionId) || [])
      .filter((timestamp) => timestamp > now - SESSION_WINDOW_MS);
    if (sessionTimes.length >= SESSION_MAX_MESSAGES) {
      return json({ error: "Please wait a little before sending another message." }, 429);
    }

    this.roomRate = this.roomRate.filter((timestamp) => timestamp > now - ROOM_WINDOW_MS);
    if (this.roomRate.length >= ROOM_MAX_MESSAGES) {
      return json({ error: "The chat is busy. Please try again in a minute." }, 429);
    }

    sessionTimes.push(now);
    this.sessionRates.set(sessionId, sessionTimes);
    this.roomRate.push(now);
    if (this.sessionRates.size > 500) {
      for (const [key, times] of this.sessionRates) {
        if (!times.some((timestamp) => timestamp > now - SESSION_WINDOW_MS)) {
          this.sessionRates.delete(key);
        }
      }
    }

    const message = { id: crypto.randomUUID(), name, text, createdAt: now };
    recent.push(message);
    const messages = recent.slice(-MAX_STORED_MESSAGES);
    await this.state.storage.put("messages", messages);
    return json({ message, messages });
  }
  async handleAdmin(request, path, now) {
    // Only the entry Worker supplies this header on private Durable Object calls.
    const passwordHash = request.headers.get("X-Hub-Admin-Hash") || "";
    const configured = /^[a-f0-9]{64}$/.test(passwordHash);
    const ttl = 8 * 60 * 60 * 1000;
    if (path === "/internal/visit") {
      if (request.method !== "POST") return json({},405);
      const entry = await request.json();
      let records = (await this.state.storage.get("traffic")) || [];
      records = records.filter(r=>r.time > now - RETENTION_MS);
      await this.countVisit(now, String(entry.ip).slice(0,64), records);
      records.push({time:now,ip:String(entry.ip).slice(0,64),path:String(entry.path).slice(0,200),country:typeof entry.country === "string" && /^(?:[A-Z]{2}|T1)$/.test(entry.country) ? entry.country : "XX",region:cleanText(entry.region,100),city:cleanText(entry.city,100)});
      await this.state.storage.put("traffic", records.slice(-1000));
      await this.state.storage.setAlarm(now + RETENTION_MS);
      return json({ok:true});
    }
    if (!configured) return json({error:"Owner access is not configured. Set the ADMIN_PASSWORD secret in Cloudflare (at least 16 characters)."},503);
    if (path === "/admin/api/admin/login") {
      if (request.method !== "POST") return json({},405);
      if (Number(request.headers.get("Content-Length")) > 4096) return json({},413);
      const rateKey = "login:" + await digest(request.headers.get("CF-Connecting-IP") || "unknown");
      const attempts = ((await this.state.storage.get(rateKey)) || []).filter(t=>t>now-15*60*1000);
      if (attempts.length>=5) return json({error:"Too many attempts. Try again in 15 minutes."},429);
      attempts.push(now);
      await this.state.storage.put(rateKey,attempts);
      await this.state.storage.setAlarm(now + RETENTION_MS);
      let input; try { input = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const expected = passwordHash;
      const actual = await digest(typeof input.password === "string" && input.password.length<=1024 ? input.password : "");
      let mismatch=0; for(let i=0;i<expected.length;i++) mismatch |= expected.charCodeAt(i)^actual.charCodeAt(i);
      if(mismatch) return json({error:"Incorrect password."},401);
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)),v=>v.toString(16).padStart(2,"0")).join("");
      await this.state.storage.put("session:" + await digest(token),{expires:now+ttl,passwordHash:expected});
      await this.state.storage.delete(rateKey);
      const response=json({ok:true});
      response.headers.set("Set-Cookie","__Host-hub_admin="+token+"; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800");
      return response;
    }
    const token = request.headers.get("Cookie")?.match(/(?:^|;\s*)__Host-hub_admin=([a-f0-9]{64})(?:;|$)/)?.[1];
    const key = token ? "session:" + await digest(token) : "";
    const session = key ? await this.state.storage.get(key) : null;
    if (!session || session.expires<=now || session.passwordHash !== passwordHash) return json({error:"Owner login required."},401);
    if (path === "/admin/api/admin/logout" && request.method === "POST") {
      await this.state.storage.delete(key);
      const response=json({ok:true});
      response.headers.set("Set-Cookie","__Host-hub_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0");
      return response;
    }
    if (request.method !== "GET") return json({},405);
    if (path === "/admin/api/admin/traffic") {
      const records=((await this.state.storage.get("traffic")) || []).filter(r=>r.time>now-RETENTION_MS);
      const today = await this.countVisit(now, null, records);
      return json({records:groupTrafficByIP(records),views:records.length,uniqueIPs:new Set(records.map(r=>r.ip)).size,today,updatedAt:now});
    }
    if (path === "/admin/api/admin/session" || path === "/admin/admin/traffic") return json({ok:true});
    return json({error:"Not found"},404);
  }


  async countVisit(now, ip, records) {
    const day = indiaDay(now);
    return this.state.storage.transaction(async storage => {
      let totals = await storage.get("daily:" + day);
      if (!totals) {
        const existing = records.filter(r=>indiaDay(r.time) === day);
        const ips = new Set(existing.map(r=>r.ip).filter(value=>value && value!=="Unavailable"));
        totals = {day,views:existing.length,visitors:ips.size};
        for (const address of ips) await storage.put("visitor:" + day + ":" + await digest(address), true);
      }
      if (ip !== null) {
        totals.views++;
        if (ip && ip !== "Unavailable") {
          const visitorKey = "visitor:" + day + ":" + await digest(ip);
          if (!(await storage.get(visitorKey))) {
            totals.visitors++;
            await storage.put(visitorKey, true);
          }
        }
      }
      await storage.put("daily:" + day, totals);
      return totals;
    });
  }

  async alarm() {
    const now=Date.now();
    const all=await this.state.storage.list();
    for(const [key,value] of all) {
      if ((key.startsWith("daily:") || key.startsWith("visitor:")) && key.split(":")[1] < indiaDay(now-RETENTION_MS)) await this.state.storage.delete(key);
      if(key==="traffic" || key==="messages") await this.state.storage.put(key,value.filter(r=>(r.time || r.createdAt)>now-RETENTION_MS));
      if(key.startsWith("session:") && value.expires<=now) await this.state.storage.delete(key);
      if(key.startsWith("login:") && !value.some(t=>t>now-15*60*1000)) await this.state.storage.delete(key);
    }
    await this.state.storage.setAlarm(now+24*60*60*1000);
  }

}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

async function digest(value) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value))),v=>v.toString(16).padStart(2,"0")).join("");
}
function adminPage(authorized) {
  const content=authorized ? '<h1>Traffic</h1><p>Private owner dashboard · One row per IP, with visit counts from the latest 1,000 page views within 7 days. Country, state and city are approximate IP locations; VPNs, proxies and mobile networks may show a different location. Older visits show Unknown.</p><div class="actions"><a href="/">Back to Academic Hub</a><button id="refresh">Refresh</button><button id="logout">Log out</button></div><h2 id="today-summary" aria-live="polite">Today: loading…</h2><p>Live · Updates every 15 seconds · India time · Visitors counted by distinct IP address</p><h2 id="summary">Loading…</h2><p id="status" role="status"></p><div class="table"><table><thead><tr><th>Last visit (India)</th><th>Visitor IP</th><th>Visits</th><th>Country</th><th>State / Region</th><th>City</th><th>Page</th></tr></thead><tbody id="rows"></tbody></table></div><section class=\"results-section\" aria-labelledby=\"results-title\"><h2 id=\"results-title\">Mock test results</h2><p>Attempt records and website traffic are together here. This private view includes every subject and shows student names and registration numbers.</p><div class=\"stats\" aria-live=\"polite\"><div class=\"metric\"><span>Total attempts</span><strong id=\"attempt-total\">Loading…</strong></div><div class=\"metric\"><span>Passed</span><strong id=\"attempt-passed\">—</strong></div><div class=\"metric\"><span>Failed</span><strong id=\"attempt-failed\">—</strong></div><div class=\"metric\"><span>Average score</span><strong id=\"attempt-average\">—</strong></div></div><div class=\"actions\"><label for=\"subject-filter\">Subject</label><select id=\"subject-filter\"><option value=\"\">All subjects</option></select><button id=\"refresh-results\" type=\"button\">Refresh mock tests</button></div><p id=\"results-status\" role=\"status\">Loading mock test results…</p><h3>Subject overview</h3><div class=\"table\"><table><thead><tr><th>Subject</th><th>Attempts</th><th>Passed</th><th>Failed</th><th>Average score</th></tr></thead><tbody id=\"subject-rows\"></tbody></table></div><h3>All attempts</h3><div class=\"table\"><table><thead><tr><th>ID</th><th>Name</th><th>Registration</th><th>Subject</th><th>Score</th><th>Total</th><th>%</th><th>Wrong</th><th>Unanswered</th><th>Status</th><th>Auto submitted</th><th>Submitted (India)</th></tr></thead><tbody id=\"result-rows\"></tbody></table></div></section>' : '<h1>Owner login</h1><p>Sign in to view Academic Hub traffic.</p><form id="login"><label for="password">Admin password</label><input id="password" type="password" autocomplete="current-password" required maxlength="1024"><button>Sign in</button></form><p id="status" role="status"></p><a href="/">Back to Academic Hub</a>';
  const script=authorized ? `
    function countryName(code){if(!code || code==='XX')return 'Unknown';if(code==='T1')return 'Tor network';if(!/^[A-Z]{2}$/.test(code))return 'Unknown';const flag=String.fromCodePoint(...Array.from(code,c=>127397+c.charCodeAt(0)));try{return flag+' '+new Intl.DisplayNames(['en'],{type:'region'}).of(code)+' ('+code+')';}catch{return flag+' '+code;}}
    async function refresh(){try{const r=await fetch('/api/admin/traffic',{cache:'no-store'});if(r.status===401){location.href='/admin/login';return;}const d=await r.json();if(!r.ok)throw Error(d.error);document.getElementById('today-summary').textContent='Today ('+d.today.day+'): '+d.today.visitors+' visitors · '+d.today.views+' page views';document.getElementById('summary').textContent=d.views+' page views · '+d.uniqueIPs+' distinct IPs';const rows=document.getElementById('rows');rows.replaceChildren();for(const v of d.records){const tr=document.createElement('tr');for(const text of [new Date(v.time).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}),v.ip,v.visits,countryName(v.country),v.region || "Unknown",v.city || "Unknown",v.path]){const td=document.createElement('td');td.textContent=text;tr.append(td);}rows.append(tr);}document.getElementById('status').textContent=d.views?'':'No visits recorded yet.';}catch(e){document.getElementById('status').textContent=e.message||'Could not load traffic.';}}
    let allResults=[];
    function isPassed(result){return /pass/i.test(result.status||"") && !/fail/i.test(result.status||"");}
    function isFailed(result){return /fail/i.test(result.status||"");}
    function addCell(row,value){const cell=document.createElement('td');cell.textContent=value==null?"":String(value);row.append(cell);}
    function formatSubmitted(value){const date=new Date(value);return Number.isNaN(date.getTime())?String(value||"Unknown"):date.toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});}
    function renderResults(){
      const filter=document.getElementById('subject-filter').value;
      const subjects=Array.from(new Set(allResults.map(r=>r.subject||"Unspecified"))).sort((a,b)=>a.localeCompare(b));
      const select=document.getElementById('subject-filter');
      const previous=select.value;
      select.replaceChildren(new Option("All subjects",""));
      for(const subject of subjects) select.add(new Option(subject,subject));
      select.value=subjects.includes(previous)?previous:"";
      const passed=allResults.filter(isPassed).length;
      const failed=allResults.filter(isFailed).length;
      const percentages=allResults.map(r=>Number(r.percentage)).filter(Number.isFinite);
      const average=percentages.length?percentages.reduce((a,b)=>a+b,0)/percentages.length:null;
      document.getElementById('attempt-total').textContent=String(allResults.length);
      document.getElementById('attempt-passed').textContent=String(passed);
      document.getElementById('attempt-failed').textContent=String(failed);
      document.getElementById('attempt-average').textContent=average===null?"—":average.toFixed(1)+"%";
      const groups=new Map();
      for(const item of allResults){
        const subject=item.subject||"Unspecified";
        if(!groups.has(subject))groups.set(subject,[]);
        groups.get(subject).push(item);
      }
      const overview=document.getElementById('subject-rows');overview.replaceChildren();
      for(const [subject,items] of Array.from(groups.entries()).sort((a,b)=>a[0].localeCompare(b[0]))){
        const row=document.createElement('tr');const scores=items.map(r=>Number(r.percentage)).filter(Number.isFinite);
        addCell(row,subject);addCell(row,items.length);addCell(row,items.filter(isPassed).length);addCell(row,items.filter(isFailed).length);
        addCell(row,scores.length?(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1)+"%":"—");overview.append(row);
      }
      const body=document.getElementById('result-rows');body.replaceChildren();
      const shown=allResults.filter(r=>!select.value||(r.subject||"Unspecified")===select.value);
      for(const item of shown){
        const row=document.createElement('tr');
        for(const value of [item.id,item.name,item.reg,item.subject,item.score,item.total,Number.isFinite(Number(item.percentage))?Number(item.percentage).toFixed(1)+"%":"",item.wrong,item.unanswered,item.status,item.auto_submitted?"Yes":"No",formatSubmitted(item.submitted_at)])addCell(row,value);
        body.append(row);
      }
      document.getElementById('results-status').textContent=allResults.length?(filter&&select.value?"Showing "+shown.length+" of "+allResults.length+" attempts.":"Showing all "+allResults.length+" attempts across "+subjects.length+" subjects."):"No mock test attempts recorded yet.";
    }
    async function refreshResults(){
      const status=document.getElementById('results-status');status.textContent='Loading mock test results…';
      const button=document.getElementById('refresh-results');button.disabled=true;
      try{
        const response=await fetch('/api/admin/results',{cache:'no-store'});
        if(response.status===401){location.href='/admin/login';return;}
        const data=await response.json();if(!response.ok)throw Error(data.error||'Could not load mock test results.');
        allResults=Array.isArray(data.results)?data.results:[];
        renderResults();
      }catch(error){status.textContent=error.message||'Could not load mock test results.';if(!allResults.length){document.getElementById('attempt-total').textContent='—';document.getElementById('attempt-passed').textContent='—';document.getElementById('attempt-failed').textContent='—';document.getElementById('attempt-average').textContent='—';}}
      finally{button.disabled=false;}
    }
    document.getElementById('refresh-results').onclick=refreshResults;
    document.getElementById('subject-filter').onchange=renderResults;
    document.getElementById('refresh').onclick=refresh;
    document.getElementById('logout').onclick=async()=>{const r=await fetch('/api/admin/logout',{method:'POST'});if(r.ok)location.href='/admin/login';};
    refresh();refreshResults();setInterval(()=>{if(!document.hidden)refresh();},15000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh();});` : `
    document.getElementById('login').onsubmit=async e=>{e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;try{const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:document.getElementById('password').value})});const d=await r.json();document.getElementById('password').value='';if(!r.ok)throw Error(d.error);location.href='/admin/traffic';}catch(e){document.getElementById('status').textContent=e.message||'Sign-in failed.';}finally{button.disabled=false;}};`;
  return new Response('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Academic Hub · Owner</title><style>body{background:#f2f6f3;color:#183b35;font:18px/1.6 system-ui;margin:0}main{max-width:1050px;margin:5vh auto;padding:28px}h1{font-size:40px}a{color:#28594e}form{max-width:420px;display:grid;gap:16px}input,button{font:inherit;border:1px solid #bdd2c7;border-radius:10px;padding:12px}button{background:#183b35;color:white;cursor:pointer}.actions{display:flex;gap:16px;align-items:center;flex-wrap:wrap}.table{overflow:auto;background:white;border-radius:12px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px;border-bottom:1px solid #e1e9e4}td{overflow-wrap:anywhere}#status{color:#914023}.results-section{margin-top:32px;padding-top:10px;border-top:2px solid #dce8e1}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px;margin:16px 0}.metric{display:grid;gap:4px;padding:14px;background:white;border:1px solid #dce8e1;border-radius:12px}.metric span{font-size:14px;color:#536a62}.metric strong{font-size:23px}.results-section select{font:inherit;border:1px solid #bdd2c7;border-radius:10px;padding:10px;background:white;color:#183b35}h3{margin-top:28px}</style></head><body><main>'+content+'</main><script>'+script+'</script></body></html>',{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'","Referrer-Policy":"no-referrer"}});
}

async function fetchMockTestResults(env) {
  if (!env.RESULTS_API || typeof env.RESULTS_API.fetch !== "function") {
    return json({error:"The mock test results service binding RESULTS_API is missing from the Academic Hub Worker."},503);
  }
  if (typeof env.RESULTS_API_TOKEN !== "string" || !env.RESULTS_API_TOKEN) {
    return json({error:"Mock test results are not connected yet. Add the RESULTS_API_TOKEN secret to the Academic Hub Worker."},503);
  }
  let upstream;
  try {
    upstream = await env.RESULTS_API.fetch(new Request("https://results.internal/results?limit=2000", {
      headers: {Authorization:"Bearer " + env.RESULTS_API_TOKEN, Accept:"application/json", "Cache-Control":"no-store"}
    }));
  } catch {
    return json({error:"The mock test results service could not be reached."},502);
  }
  if (upstream.status === 401) return json({error:"The results service rejected the configured secret. Match RESULTS_API_TOKEN on Academic Hub with ADMIN_TOKEN on the results Worker."},503);
  if (!upstream.ok) return json({error:"The mock test results service returned HTTP " + upstream.status + "."},502);
  let payload;
  try { payload = await upstream.json(); } catch { return json({error:"The mock test results service returned invalid data."},502); }
  const results = Array.isArray(payload.results) ? payload.results : [];
  return json({results:results.map((item) => ({
    id:Number.isFinite(Number(item.id)) ? Number(item.id) : "",
    name:typeof item.name === "string" ? item.name.slice(0,120) : "",
    reg:typeof item.reg === "string" ? item.reg.slice(0,80) : "",
    subject:typeof item.subject === "string" ? item.subject.slice(0,80) : "",
    score:Number.isFinite(Number(item.score)) ? Number(item.score) : null,
    total:Number.isFinite(Number(item.total)) ? Number(item.total) : null,
    percentage:Number.isFinite(Number(item.percentage)) ? Number(item.percentage) : null,
    wrong:Number.isFinite(Number(item.wrong)) ? Number(item.wrong) : null,
    unanswered:Number.isFinite(Number(item.unanswered)) ? Number(item.unanswered) : null,
    status:typeof item.status === "string" ? item.status.slice(0,40) : "",
    auto_submitted:Boolean(Number(item.auto_submitted)),
    submitted_at:typeof item.submitted_at === "string" ? item.submitted_at.slice(0,100) : ""
  }))});
}

// Read secrets from the current entry Worker on every request, not from a
// retained Durable Object instance or a namespace owned by another Worker.
// Never forward a client-supplied verification header.
async function adminRequest(request, env, url) {
  const internal = new Request(url, request);
  internal.headers.delete("X-Hub-Admin-Hash");
  if (typeof env.ADMIN_PASSWORD === "string" && env.ADMIN_PASSWORD.length >= 16) {
    internal.headers.set("X-Hub-Admin-Hash", await digest(env.ADMIN_PASSWORD));
  }
  return internal;
}

// A dedicated namespace owned by this Worker keeps admin storage separate from legacy chat.
export class OwnerTraffic extends StudyHubChat {}

function indiaDay(time) { return new Date(time + 330*60*1000).toISOString().slice(0,10); }

function groupTrafficByIP(records) {
  const groups = new Map();
  for (const record of records.slice().sort((a,b)=>b.time-a.time)) {
    let group = groups.get(record.ip);
    if (!group) {
      group = {...record,visits:0};
      groups.set(record.ip,group);
    }
    group.visits++;
    // Older records may fill missing geo metadata; keep the latest visit and page.
    if ((!group.country || group.country === "XX") && record.country && record.country !== "XX") group.country=record.country;
    if (!group.region && record.region) group.region=record.region;
    if (!group.city && record.city) group.city=record.city;
  }
  return Array.from(groups.values());
}

