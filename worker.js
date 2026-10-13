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
    const room = env.TRAFFIC_ROOM.get(env.TRAFFIC_ROOM.idFromName("academic-hub-owner-traffic"));
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin/")) {
      if (!["/admin/login", "/admin/traffic", "/api/admin/login", "/api/admin/logout", "/api/admin/traffic", "/api/admin/session"].includes(url.pathname)) return json({error:"Not found"},404);
      if (request.method === "POST" && request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      if (url.pathname === "/admin/login" && request.method === "GET") return adminPage(false);
      if (typeof env.ADMIN_PASSWORD !== "string" || !env.ADMIN_PASSWORD) return json({error:"The active Worker is missing its ADMIN_PASSWORD runtime secret."},503);
      if (env.ADMIN_PASSWORD.length < 16) return json({error:"The saved ADMIN_PASSWORD is shorter than 16 characters. Update the runtime secret to a longer password."},503);
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
      return json({records:records.slice().reverse(),views:records.length,uniqueIPs:new Set(records.map(r=>r.ip)).size});
    }
    if (path === "/admin/api/admin/session" || path === "/admin/admin/traffic") return json({ok:true});
    return json({error:"Not found"},404);
  }

  async alarm() {
    const now=Date.now();
    const all=await this.state.storage.list();
    for(const [key,value] of all) {
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
  const content=authorized ? '<h1>Traffic</h1><p>Private owner dashboard · Latest 1,000 page views within 7 days. Country, state and city are approximate IP locations; VPNs, proxies and mobile networks may show a different location. Older visits show Unknown.</p><div class="actions"><a href="/">Back to Academic Hub</a><button id="refresh">Refresh</button><button id="logout">Log out</button></div><h2 id="summary">Loading…</h2><p id="status" role="status"></p><div class="table"><table><thead><tr><th>Time (India)</th><th>Visitor IP</th><th>Country</th><th>State / Region</th><th>City</th><th>Page</th></tr></thead><tbody id="rows"></tbody></table></div>' : '<h1>Owner login</h1><p>Sign in to view Academic Hub traffic.</p><form id="login"><label for="password">Admin password</label><input id="password" type="password" autocomplete="current-password" required maxlength="1024"><button>Sign in</button></form><p id="status" role="status"></p><a href="/">Back to Academic Hub</a>';
  const script=authorized ? `
    function countryName(code){if(!code || code==='XX')return 'Unknown';if(code==='T1')return 'Tor network';try{return new Intl.DisplayNames(['en'],{type:'region'}).of(code)+' ('+code+')';}catch{return code;}}
    async function refresh(){try{const r=await fetch('/api/admin/traffic',{cache:'no-store'});if(r.status===401){location.href='/admin/login';return;}const d=await r.json();if(!r.ok)throw Error(d.error);document.getElementById('summary').textContent=d.views+' page views · '+d.uniqueIPs+' distinct IPs';const rows=document.getElementById('rows');rows.replaceChildren();for(const v of d.records){const tr=document.createElement('tr');for(const text of [new Date(v.time).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}),v.ip,countryName(v.country),v.region || "Unknown",v.city || "Unknown",v.path]){const td=document.createElement('td');td.textContent=text;tr.append(td);}rows.append(tr);}document.getElementById('status').textContent=d.views?'':'No visits recorded yet.';}catch(e){document.getElementById('status').textContent=e.message||'Could not load traffic.';}}
    document.getElementById('refresh').onclick=refresh;
    document.getElementById('logout').onclick=async()=>{const r=await fetch('/api/admin/logout',{method:'POST'});if(r.ok)location.href='/admin/login';};
    refresh();` : `
    document.getElementById('login').onsubmit=async e=>{e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;try{const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:document.getElementById('password').value})});const d=await r.json();document.getElementById('password').value='';if(!r.ok)throw Error(d.error);location.href='/admin/traffic';}catch(e){document.getElementById('status').textContent=e.message||'Sign-in failed.';}finally{button.disabled=false;}};`;
  return new Response('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Academic Hub · Owner</title><style>body{background:#f2f6f3;color:#183b35;font:18px/1.6 system-ui;margin:0}main{max-width:1050px;margin:5vh auto;padding:28px}h1{font-size:40px}a{color:#28594e}form{max-width:420px;display:grid;gap:16px}input,button{font:inherit;border:1px solid #bdd2c7;border-radius:10px;padding:12px}button{background:#183b35;color:white;cursor:pointer}.actions{display:flex;gap:16px;align-items:center;flex-wrap:wrap}.table{overflow:auto;background:white;border-radius:12px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px;border-bottom:1px solid #e1e9e4}td{overflow-wrap:anywhere}#status{color:#914023}</style></head><body><main>'+content+'</main><script>'+script+'</script></body></html>',{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'","Referrer-Policy":"no-referrer"}});
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
