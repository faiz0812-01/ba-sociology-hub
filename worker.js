import {handleStudyHelper} from './study-helper-backend.js';
export {StudyHelperQuota} from './study-helper-backend.js';
const CHAT_PATH = "/api/chat";
const TRACKER_SCRIPT = "(()=>{let last=\"\";const labels={top:\"Overview\",subjects:\"Semester subjects\",tests:\"Practice tests\",\"ai-study\":\"AI Study Helper\",\"community-chat\":\"Student chat\",support:\"Support\"};function decode(value){try{return decodeURIComponent(value)}catch{return value}}function title(value){return value.replace(/[-_]+/g,\" \").split(\" \").map(function(word){return word?word.charAt(0).toUpperCase()+word.slice(1):\"\"}).join(\" \")}function currentSection(){const path=location.pathname||\"/\";const hash=decode((location.hash||\"\").slice(1));return labels[hash]||(hash?title(hash):(path===\"/\"||path===\"/index.html\"?\"Home\":title(path.split(\"/\").filter(Boolean).map(decode).join(\" / \"))))}function record(){const path=location.pathname||\"/\";const hash=decode((location.hash||\"\").slice(1));const key=path+\"#\"+hash;if(key===last)return;last=key;const label=currentSection();fetch(\"/api/traffic/section\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({path:path,section:label}),keepalive:true}).catch(function(){});}window.addEventListener(\"hashchange\",record);window.addEventListener(\"pageshow\",record);window.addEventListener(\"popstate\",record);record();function livePresence(active){if(document.querySelector(\".hub-owner-traffic-control\"))return;let id=\"\";try{id=sessionStorage.getItem(\"hub_live_visitor\")||\"\";if(!id){id=\"v-\"+Date.now().toString(36)+\"-\"+Math.random().toString(36).slice(2)+\"-\"+Math.random().toString(36).slice(2);sessionStorage.setItem(\"hub_live_visitor\",id)}}catch{id=\"v-\"+Date.now().toString(36)+\"-\"+Math.random().toString(36).slice(2)+\"-\"+Math.random().toString(36).slice(2)}fetch(\"/api/traffic/presence\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({visitorId:id,path:location.pathname||\"/\",section:currentSection(),active:active!==false}),keepalive:true}).catch(function(){})}livePresence(true);setInterval(function(){if(!document.hidden)livePresence(true)},25000);document.addEventListener(\"visibilitychange\",function(){if(!document.hidden)livePresence(true)});window.addEventListener(\"pagehide\",function(){livePresence(false)})})();";
const OWNER_LIVE_SCRIPT = "(()=>{const control=document.getElementById('hub-live-control'),panel=document.getElementById('hub-live-panel'),count=document.getElementById('hub-live-count'),summary=document.getElementById('hub-live-summary'),pages=document.getElementById('hub-live-pages'),close=document.getElementById('hub-live-close');if(!control||!panel||!count||!summary||!pages||!close)return;function displayPage(item){const path=String(item.path||'/');const section=String(item.section||'').trim();if(path==='/'||path==='/index.html')return section&&section!=='Home'&&section!=='Overview'?'Home · '+section:'Home page';return section||path}async function update(){try{const response=await fetch('/api/admin/live-visitors',{cache:'no-store',credentials:'same-origin'});if(response.status===401){count.textContent='—';summary.textContent='Owner sign-in required. Sign in to the owner dashboard and reload this page.';pages.replaceChildren();return}const data=await response.json();if(!response.ok)throw Error(data.error||'Could not load live visitors.');const active=Number(data.active)||0;count.textContent=String(active);summary.textContent=active+' active tab'+(active===1?'':'s')+' seen in the last 90 seconds';pages.replaceChildren();const entries=Array.isArray(data.pages)?data.pages:[];if(!active||!entries.length){const empty=document.createElement('li');empty.className='hub-live-empty';empty.textContent='No active visitors right now.';pages.append(empty);return}for(const item of entries){const row=document.createElement('li');const path=document.createElement('span');path.textContent=displayPage(item);const total=document.createElement('strong');const visitors=Number(item.count)||0;total.textContent=visitors+' tab'+(visitors===1?'':'s');row.append(path,total);pages.append(row)}}catch(error){summary.textContent=error.message||'Could not load live visitors.'}}function setOpen(open){panel.hidden=!open;control.setAttribute('aria-expanded',String(open));if(open)update()}control.addEventListener('click',()=>setOpen(panel.hidden));close.addEventListener('click',()=>setOpen(false));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){setOpen(false);control.focus()}});update();setInterval(()=>{if(!document.hidden)update()},15000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()})})();";
const MAX_NAME = 32;
const MAX_MESSAGE = 500;
const MAX_STORED_MESSAGES = 100;
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
const SESSION_WINDOW_MS = 30 * 1000;
const SESSION_MAX_MESSAGES = 5;
const ROOM_WINDOW_MS = 60 * 1000;
const ROOM_MAX_MESSAGES = 40;

function isPrivateBuPath(pathname) {
  let candidate = String(pathname || "/");
  for (let depth = 0; depth < 5; depth += 1) {
    candidate = candidate.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
    if (/^\/bu(?:\/|$)/i.test(candidate)) return true;
    try {
      const decoded = decodeURIComponent(candidate);
      if (decoded === candidate) return false;
      candidate = decoded;
    } catch {
      return false;
    }
  }
  candidate = candidate.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  return /^\/bu(?:\/|$)/i.test(candidate);
}

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
    if (url.pathname === "/live-owner.js" && request.method === "GET") return new Response(OWNER_LIVE_SCRIPT,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
    if (url.pathname === "/traffic-tracker.js" && request.method === "GET") return new Response(TRACKER_SCRIPT,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
    if (url.pathname === '/api/study-helper' || url.pathname === '/api/study-helper/status') return handleStudyHelper(request, env);
    const room = env.TRAFFIC_ROOM.get(env.TRAFFIC_ROOM.idFromName("academic-hub-owner-traffic"));
    if (isPrivateBuPath(url.pathname)) {
      if (request.method !== "GET" && request.method !== "HEAD") return json({error:"Method not allowed."},405);
      const buSession = await room.fetch(await adminRequest(request, env, "https://internal/admin/api/admin/session"));
      if (!buSession.ok) {
        const next = url.pathname + url.search;
        return new Response(null,{status:303,headers:{Location:"/admin/login?next="+encodeURIComponent(next),"Cache-Control":"no-store","X-Robots-Tag":"noindex, nofollow"}});
      }
      if (url.pathname === "/bu") return new Response(null,{status:308,headers:{Location:"/bu/"+url.search,"Cache-Control":"no-store"}});
      const buAsset = await env.ASSETS.fetch(request);
      const privateBuAsset = new Response(buAsset.body,buAsset);
      privateBuAsset.headers.set("Cache-Control","private, no-store");
      privateBuAsset.headers.set("Vary","Cookie");
      privateBuAsset.headers.set("X-Robots-Tag","noindex, nofollow");
      return privateBuAsset;
    }
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin/")) {
      if (!["/admin/login", "/admin/traffic", "/api/admin/login", "/api/admin/logout", "/api/admin/traffic", "/api/admin/session", "/api/admin/results", "/api/admin/live-visitors"].includes(url.pathname)) return json({error:"Not found"},404);
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
      if (url.pathname === "/api/admin/live-visitors") {
        if (request.method !== "GET") return json({error:"Method not allowed."},405);
        return room.fetch(await adminRequest(request, env, "https://internal/admin/api/admin/live-visitors"));
      }
      const result = await room.fetch(await adminRequest(request, env, "https://internal/admin" + url.pathname));
      if (url.pathname === "/admin/traffic" && request.method === "GET") {
        return result.ok ? adminPage(true) : new Response(null,{status:303,headers:{Location:"/admin/login","Cache-Control":"no-store"}});
      }
      return result;
    }
    if (url.pathname === "/api/traffic/section") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      if (request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      if (Number(request.headers.get("Content-Length")) > 2048) return json({error:"Request too large."},413);
      let input; try { input = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const path=typeof input.path==="string" ? input.path.slice(0,160) : "";
      const section=cleanText(input.section,80);
      if (!path.startsWith("/") || path.startsWith("//") || !section) return json({error:"Invalid section."},400);
      const ip=request.headers.get("CF-Connecting-IP") || "Unavailable";
      return room.fetch(new Request("https://internal/internal/section",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ip,path,section})}));
    }
    if (url.pathname === "/api/traffic/presence") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      if (request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      if (Number(request.headers.get("Content-Length")) > 2048) return json({error:"Request too large."},413);
      let body; try { body=await request.text(); } catch { return json({error:"Invalid request."},400); }
      if (body.length>2048) return json({error:"Request too large."},413);
      let input; try { input=JSON.parse(body); } catch { return json({error:"Invalid request."},400); }
      if (!input || typeof input!=="object" || Array.isArray(input)) return json({error:"Invalid presence."},400);
      const visitorId=typeof input.visitorId==="string" ? input.visitorId.slice(0,80) : "";
      const path=typeof input.path==="string" ? input.path.slice(0,160) : "";
      const section=cleanText(input.section,80);
      if (!/^[a-zA-Z0-9-]{16,80}$/.test(visitorId) || !path.startsWith("/") || path.startsWith("//")) return json({error:"Invalid presence."},400);
      const active=input.active!==false;
      return room.fetch(new Request("https://internal/internal/presence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({visitorId,path,section,active})}));
    }
    if (url.pathname === CHAT_PATH) {
      if (request.method !== "GET" && request.method !== "POST") return json({error:"Method not allowed."},405);
      const chat = env.CHAT_ROOM.get(env.CHAT_ROOM.idFromName("ba-sociology-semester-chat"));
      return chat.fetch(request);
    }
    if (url.pathname === "/api/chat/status") {
      if (request.method !== "GET") return json({error:"Method not allowed."},405);
      const isMod = await isAuthorizedModerator(request, env, room);
      return json({ isModerator: isMod });
    }
    if (url.pathname === "/api/chat/auth") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      if (request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 16) return json({error:"Moderator access is not configured."},503);
      let input; try { input = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const expected = await digest(env.ADMIN_PASSWORD);
      const actual = await digest(typeof input.password === "string" ? input.password : "");
      let mismatch = 0;
      for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
      if (mismatch) return json({error:"Incorrect password."},401);
      const loginRes = await room.fetch(await adminRequest(new Request("https://internal/admin/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input.password })
      }), env, "https://internal/admin/api/admin/login"));
      const setCookie = loginRes.headers.get("Set-Cookie");
      const res = json({ ok: true, isModerator: true });
      if (setCookie) res.headers.set("Set-Cookie", setCookie);
      return res;
    }
    if (url.pathname === "/api/chat/delete") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      if (request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      let input; try { input = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const isMod = await isAuthorizedModerator(request, env, room, input?.adminPassword);
      if (!isMod) return json({error:"Unauthorized. Moderator login required."},401);
      if (!input?.id || typeof input.id !== "string") return json({error:"Missing message ID."},400);
      const chat = env.CHAT_ROOM.get(env.CHAT_ROOM.idFromName("ba-sociology-semester-chat"));
      return chat.fetch(new Request("https://internal/internal/chat/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: input.id })
      }));
    }
    if (url.pathname === "/api/chat/clear") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      if (request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      let input = {}; try { input = await request.json(); } catch {}
      const isMod = await isAuthorizedModerator(request, env, room, input?.adminPassword);
      if (!isMod) return json({error:"Unauthorized. Moderator login required."},401);
      const chat = env.CHAT_ROOM.get(env.CHAT_ROOM.idFromName("ba-sociology-semester-chat"));
      return chat.fetch(new Request("https://internal/internal/chat/clear", {
        method: "POST"
      }));
    }
    if (url.pathname === "/api/test-results/submit") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      if (request.headers.get("Origin") !== url.origin) return json({error:"Forbidden"},403);
      const declaredLength = Number(request.headers.get("Content-Length") || 0);
      if (declaredLength > 16384) return json({error:"Request too large."},413);
      let body;
      try { body = await request.text(); } catch { return json({error:"Invalid request."},400); }
      if (body.length > 16384) return json({error:"Request too large."},413);
      let payload;
      try { payload = JSON.parse(body); } catch { return json({error:"Invalid JSON."},400); }
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) return json({error:"Invalid result."},400);
      if (!env.RESULTS_API || typeof env.RESULTS_API.fetch !== "function") return json({error:"The mock test results service is not connected."},503);
      let upstream;
      try {
        upstream = await env.RESULTS_API.fetch(new Request("https://results.internal/submit", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(payload)
        }));
      } catch {
        return json({error:"The mock test results service could not be reached."},502);
      }
      const responseBody = await upstream.text();
      return new Response(responseBody, {status:upstream.status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
    }
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/internal/")) return json({error:"Not found"},404);
    let response = await env.ASSETS.fetch(request);
    if (request.method === "GET" && response.ok && response.headers.get("Content-Type")?.includes("text/html")) {
      const task = room.fetch(new Request("https://internal/internal/visit", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ip:request.headers.get("CF-Connecting-IP") || "Unavailable",path:url.pathname,country:request.cf?.country || "XX",region:request.cf?.region || "",city:request.cf?.city || ""})})).catch(()=>{});
      ctx.waitUntil(task);
      const session = await room.fetch(await adminRequest(request, env, "https://internal/admin/api/admin/session"));
      response = new HTMLRewriter().on("body",{element(el){
        el.append('<script src="/traffic-tracker.js" defer></script>',{html:true});
        if(session.ok) {
          el.append("<style id=\"hub-owner-live-control-style\">.hub-owner-live-control{position:fixed!important;right:max(12px,env(safe-area-inset-right,0px))!important;top:max(12px,env(safe-area-inset-top,0px))!important;z-index:2147483647!important;display:inline-flex!important;align-items:center;justify-content:center;gap:.45rem;min-height:48px;min-width:48px;max-width:calc(100vw - 24px);padding:12px 18px;box-sizing:border-box;border:2px solid #fff;border-radius:999px;background:#173b35;color:#fff!important;box-shadow:0 6px 24px rgba(0,0,0,.32);font:700 16px/1.2 system-ui,sans-serif;text-decoration:none!important;touch-action:manipulation;-webkit-tap-highlight-color:transparent;cursor:pointer}.hub-owner-live-control:hover,.hub-owner-live-control:focus-visible{background:#225c50;outline:3px solid #f3c969;outline-offset:2px}.hub-owner-live-control:active{transform:translateY(1px)}.hub-owner-live-panel{position:fixed!important;right:max(12px,env(safe-area-inset-right,0px))!important;top:calc(max(12px,env(safe-area-inset-top,0px)) + 62px)!important;z-index:2147483646!important;width:min(370px,calc(100vw - 24px));max-height:min(72vh,560px);overflow:auto;box-sizing:border-box;padding:18px;border:1px solid #dce8e1;border-radius:18px;background:#fff;color:#183b35;box-shadow:0 18px 50px rgba(0,0,0,.28);font:15px/1.5 system-ui,sans-serif}.hub-owner-live-panel[hidden]{display:none!important}.hub-owner-live-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.hub-owner-live-heading h2{margin:0;font-size:20px;color:#183b35}.hub-owner-live-close{width:38px;height:38px;border:0;border-radius:10px;background:#edf3ef;color:#183b35;font-size:23px;line-height:1;cursor:pointer}.hub-owner-live-summary{margin:8px 0 14px;color:#536a62}.hub-owner-live-pages{list-style:none;display:grid;gap:8px;margin:0;padding:0}.hub-owner-live-pages li{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 12px;border:1px solid #e1e9e4;border-radius:11px;background:#f7faf8;overflow-wrap:anywhere}.hub-owner-live-pages li strong{flex:none;color:#225c50;font-size:12px}.hub-owner-live-pages li.hub-live-empty{color:#536a62}.hub-owner-live-note{display:block;margin-top:14px;color:#64776f;font-size:12px}@media(max-width:600px){.hub-owner-live-control{min-height:50px;padding:13px 16px;font-size:15px}.hub-owner-live-panel{max-height:70vh;padding:15px}}</style>",{html:true});
          el.append("<button class=\"hub-owner-live-control hub-owner-traffic-control\" id=\"hub-live-control\" type=\"button\" aria-label=\"Show live visitors on this page\" aria-expanded=\"false\" aria-controls=\"hub-live-panel\">Live visitors <b id=\"hub-live-count\" aria-live=\"polite\">…</b></button><section id=\"hub-live-panel\" class=\"hub-owner-live-panel\" role=\"region\" aria-labelledby=\"hub-live-title\" hidden><div class=\"hub-owner-live-heading\"><h2 id=\"hub-live-title\">Live visitors</h2><button id=\"hub-live-close\" class=\"hub-owner-live-close\" type=\"button\" aria-label=\"Close live visitors\">×</button></div><p id=\"hub-live-summary\" class=\"hub-owner-live-summary\" aria-live=\"polite\">Checking live visitors…</p><ul id=\"hub-live-pages\" class=\"hub-owner-live-pages\"></ul><small class=\"hub-owner-live-note\">Active browser tabs from the last 90 seconds, grouped by page and section. Session names and IP addresses are not shown.</small></section><script src=\"/live-owner.js\" defer></script>",{html:true});
        }
      }}).transform(response);
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
    this.sectionRates = new Map();
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
    if (path.startsWith('/admin/') || path === '/internal/visit' || path === '/internal/section' || path === '/internal/presence') return this.handleAdmin(request, path, now);
    if (path === "/internal/chat/delete") {
      if (request.method !== "POST") return json({}, 405);
      let input; try { input = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      const id = typeof input?.id === "string" ? input.id : "";
      if (!id) return json({ error: "Message ID is required." }, 400);
      let stored = (await this.state.storage.get("messages")) || [];
      const beforeCount = stored.length;
      stored = stored.filter(m => m.id !== id);
      await this.state.storage.put("messages", stored);
      return json({ ok: true, deleted: beforeCount !== stored.length, messages: stored });
    }
    if (path === "/internal/chat/clear") {
      if (request.method !== "POST") return json({}, 405);
      await this.state.storage.put("messages", []);
      return json({ ok: true, messages: [] });
    }
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
      await this.state.storage.put("traffic", records.slice(-5000));
      await this.state.storage.setAlarm(now + RETENTION_MS);
      return json({ok:true});
    }
    if (path === "/internal/section") {
      if (request.method !== "POST") return json({},405);
      let entry; try { entry = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const ip=typeof entry.ip==="string" ? entry.ip.slice(0,64) : "Unavailable";
      const page=typeof entry.path==="string" ? entry.path.slice(0,160) : "";
      const section=cleanText(entry.section,80);
      if (!page.startsWith("/") || page.startsWith("//") || !section) return json({error:"Invalid section."},400);
      const rate=this.sectionRates.get(ip) || [];
      const recent=rate.filter(time=>time>now-60*1000);
      if (recent.length>=60) return json({error:"Section activity limit reached."},429);
      recent.push(now); this.sectionRates.set(ip,recent);
      if (this.sectionRates.size>1000) {
        for (const [key,times] of this.sectionRates) {
          if (!times.some(time=>time>now-60*1000)) this.sectionRates.delete(key);
        }
      }
      let events=(await this.state.storage.get("sectionVisits")) || [];
      events=events.filter(event=>event.time>now-RETENTION_MS);
      events.push({time:now,ip,path:page,section});
      await this.state.storage.put("sectionVisits",events.slice(-5000));
      await this.state.storage.setAlarm(now+RETENTION_MS);
      return json({ok:true});
    }
    if (path === "/internal/presence") {
      if (request.method !== "POST") return json({},405);
      let entry; try { entry = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const visitorId=typeof entry.visitorId==="string" ? entry.visitorId : "";
      const page=typeof entry.path==="string" ? entry.path.slice(0,160) : "";
      const section=cleanText(entry.section,80);
      if (!/^[a-zA-Z0-9-]{16,80}$/.test(visitorId) || !page.startsWith("/") || page.startsWith("//")) return json({error:"Invalid presence."},400);
      const key=await digest(visitorId);
      const saved=(await this.state.storage.get("liveVisitors")) || {};
      const live=Object.fromEntries(Object.entries(saved).filter(([,visitor])=>Number(visitor?.lastSeen)>now-90*1000));
      if (entry.active===false) delete live[key];
      else live[key]={path:page,section,lastSeen:now};
      await this.state.storage.put("liveVisitors",live);
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
    if (path === "/admin/api/admin/live-visitors") {
      const saved=(await this.state.storage.get("liveVisitors")) || {};
      const entries=Object.entries(saved).filter(([,visitor])=>Number(visitor?.lastSeen)>now-90*1000);
      const live=Object.fromEntries(entries);
      if (entries.length!==Object.keys(saved).length) await this.state.storage.put("liveVisitors",live);
      const pages=new Map();
      for (const [,visitor] of entries) {
        const page=typeof visitor.path==="string" ? visitor.path : "/";
        const section=typeof visitor.section==="string" ? visitor.section : "";
        const key=JSON.stringify([page,section]);
        const group=pages.get(key)||{path:page,section,count:0};
        group.count++;
        pages.set(key,group);
      }
      return json({active:entries.length,pages:Array.from(pages.values()).sort((a,b)=>b.count-a.count),updatedAt:now});
    }
    if (path === "/admin/api/admin/traffic") {
      const records=((await this.state.storage.get("traffic")) || []).filter(r=>r.time>now-RETENTION_MS);
      const sectionVisits=((await this.state.storage.get("sectionVisits")) || []).filter(r=>r.time>now-RETENTION_MS);
      const today = await this.countVisit(now, null, records);
      const uniqueIPs=new Set([...records.map(r=>r.ip),...sectionVisits.map(r=>r.ip)]);
      return json({records:groupTrafficByIP(records,sectionVisits),popularPages:groupPopularPages(sectionVisits),views:records.length,uniqueIPs:uniqueIPs.size,today,updatedAt:now});
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
      if(key==="traffic" || key==="messages" || key==="sectionVisits") await this.state.storage.put(key,value.filter(r=>(r.time || r.createdAt)>now-RETENTION_MS));
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
  const content=authorized ? "<h1>Traffic</h1><p>Private owner dashboard · One row per IP, with visit counts from the latest 5,000 page views within 7 days. Popular page counts are based on section activity recorded since tracking started. Country, state and city are approximate IP locations; VPNs, proxies and mobile networks may show a different location. Older visits show Unknown.</p><div class=\"actions\"><a href=\"/\">Back to Academic Hub</a><button id=\"refresh\">Refresh</button><button id=\"logout\">Log out</button></div><h2 id=\"today-summary\" aria-live=\"polite\">Today: loading…</h2><p>Live · Updates every 15 seconds · India time · Visitors counted by distinct IP address</p><h2 id=\"summary\">Loading…</h2><p id=\"status\" role=\"status\"></p><div class=\"traffic-tabs\" role=\"tablist\" aria-label=\"Traffic views\"><button class=\"traffic-tab active\" id=\"visitors-tab\" type=\"button\" role=\"tab\" aria-selected=\"true\" aria-controls=\"visitors-panel\">Visitors</button><button class=\"traffic-tab\" id=\"popular-tab\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"popular-panel\">Popular pages</button><button class=\"traffic-tab\" id=\"live-tab\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"live-panel\">Live now</button><button class=\"traffic-tab\" id=\"chat-tab\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"chat-panel\">Community chat</button></div><div id=\"live-panel\" class=\"traffic-panel\" role=\"tabpanel\" aria-labelledby=\"live-tab\" hidden><h2 id=\"live-summary\" aria-live=\"polite\">Checking live visitors…</h2><p class=\"panel-intro\">Active browser tabs seen within the last 90 seconds, grouped by page and section. Session names and IP addresses are not shown here.</p><div id=\"live-pages\" class=\"subject-grid\"></div></div><div id=\"visitors-panel\" class=\"traffic-panel\" role=\"tabpanel\" aria-labelledby=\"visitors-tab\"><div class=\"table traffic-table\"><table><thead><tr><th>Last visit (India)</th><th>Visitor IP</th><th>Visits</th><th>Country</th><th>State / Region</th><th>City</th><th>Latest page</th><th>Sections visited</th></tr></thead><tbody id=\"rows\"></tbody></table></div><div class=\"pagination traffic-pagination\" aria-label=\"Traffic pagination\"><label class=\"page-size-label\" for=\"traffic-page-size\">Rows per page <select id=\"traffic-page-size\"><option value=\"25\" selected>25</option><option value=\"50\">50</option><option value=\"100\">100</option></select></label><span id=\"traffic-page-info\" class=\"page-info\" aria-live=\"polite\">Page 1 of 1</span><div class=\"page-controls\"><button id=\"traffic-prev-page\" type=\"button\" disabled>Previous</button><button id=\"traffic-next-page\" type=\"button\" disabled>Next</button></div></div></div><div id=\"popular-panel\" class=\"traffic-panel\" role=\"tabpanel\" aria-labelledby=\"popular-tab\" hidden><p class=\"panel-intro\">Ranked by section visits since tracking started. Expand a page to see visitor IPs, repeat counts and last activity.</p><div class=\"table popular-pages-table\"><table><thead><tr><th>Rank</th><th>Page / section</th><th>Visits</th><th>Visitors</th><th>Last activity (India)</th><th>Details</th></tr></thead><tbody id=\"popular-page-rows\"></tbody></table></div></div><div id=\"chat-panel\" class=\"traffic-panel\" role=\"tabpanel\" aria-labelledby=\"chat-tab\" hidden><div style=\"display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 0;flex-wrap:wrap\"><div><h2 style=\"margin:0;font-size:18px;color:#183b35\">Community chat moderation</h2><p class=\"panel-intro\" style=\"margin:3px 0 0\">Review all active student messages, remove spam or inappropriate messages, or clear the chat room.</p></div><div style=\"display:flex;gap:8px\"><button id=\"admin-chat-refresh\" type=\"button\" style=\"background:#183b35;color:#fff;padding:8px 12px;border:0;border-radius:8px;font-size:12px;cursor:pointer\">Refresh chat</button><button id=\"admin-chat-clear\" type=\"button\" style=\"background:#8c2929;color:#fff;padding:8px 12px;border:0;border-radius:8px;font-size:12px;cursor:pointer\">Clear all messages</button></div></div><p id=\"admin-chat-status\" role=\"status\" style=\"margin:6px 0 10px;font-size:12px;color:#536a62\"></p><div class=\"table\"><table><thead><tr><th style=\"width:160px\">Time (India)</th><th style=\"width:150px\">Student</th><th>Message</th><th style=\"width:110px\">Action</th></tr></thead><tbody id=\"admin-chat-rows\"></tbody></table></div></div><section class=\"results-section\" aria-labelledby=\"results-title\"><div class=\"results-heading\"><h2 id=\"results-title\">Mock test results</h2><p>Seven-subject overview, attempt details, and repeated-IP counts.</p></div><div class=\"stats\" aria-live=\"polite\"><div class=\"metric\"><span>Total attempts</span><strong id=\"attempt-total\">Loading…</strong></div><div class=\"metric\"><span>Passed</span><strong id=\"attempt-passed\">—</strong></div><div class=\"metric\"><span>Below pass</span><strong id=\"attempt-failed\">—</strong></div><div class=\"metric\"><span>Average score</span><strong id=\"attempt-average\">—</strong></div><div class=\"metric\"><span>IP addresses with repeats</span><strong id=\"repeated-ip-total\">—</strong></div></div><div class=\"results-tabs\" role=\"tablist\" aria-label=\"Mock test result views\"><button class=\"results-tab active\" id=\"dashboard-tab\" type=\"button\" role=\"tab\" aria-selected=\"true\" aria-controls=\"dashboard-panel\">Dashboard</button><button class=\"results-tab\" id=\"attempts-tab\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"attempts-panel\">Attempts</button></div><div id=\"dashboard-panel\" class=\"results-panel\" role=\"tabpanel\" aria-labelledby=\"dashboard-tab\"><p class=\"panel-intro\">Seven subjects with test counts, attempts, pass and below-pass totals, and average marks.</p><div id=\"subject-rows\" class=\"subject-grid\"></div></div><div id=\"attempts-panel\" class=\"results-panel\" role=\"tabpanel\" aria-labelledby=\"attempts-tab\" hidden><div class=\"actions attempt-actions\"><label for=\"subject-filter\">Subject</label><select id=\"subject-filter\"><option value=\"\">All subjects</option></select><button id=\"refresh-results\" type=\"button\">Refresh mock tests</button></div><p id=\"results-status\" role=\"status\">Loading mock test results…</p><div class=\"table attempt-table\"><table><thead><tr><th>ID</th><th>Name</th><th>Registration</th><th>Subject</th><th>Score</th><th>Total</th><th>Mark</th><th>Same-IP attempts</th><th>Wrong</th><th>Unanswered</th><th>Status</th><th>Auto submitted</th><th>Submitted (India)</th></tr></thead><tbody id=\"result-rows\"></tbody></table></div><div class=\"pagination\" aria-label=\"Attempt pagination\"><label class=\"page-size-label\" for=\"page-size\">Rows per page <select id=\"page-size\"><option value=\"25\">25</option><option value=\"50\" selected>50</option><option value=\"100\">100</option></select></label><span id=\"page-info\" class=\"page-info\" aria-live=\"polite\">Page 1 of 1</span><div class=\"page-controls\"><button id=\"prev-page\" type=\"button\" disabled>Previous</button><button id=\"next-page\" type=\"button\" disabled>Next</button></div></div></div></section>" : "<h1>Owner login</h1><p>Sign in to access the private owner area.</p><form id=\"login\"><label for=\"password\">Admin password</label><input id=\"password\" type=\"password\" autocomplete=\"current-password\" required maxlength=\"1024\"><button>Sign in</button></form><p id=\"status\" role=\"status\"></p><a href=\"/\">Back to Academic Hub</a>";
  const script=authorized ? `
    function countryInfo(code){
      if(!code||code==='XX')return {flag:'🌐',name:'Unknown'};
      if(code==='T1')return {flag:'🧅',name:'Tor network'};
      if(!/^[A-Z]{2}$/.test(code))return {flag:'🌐',name:'Unknown'};
      const flag=String.fromCodePoint(...Array.from(code,c=>127397+c.charCodeAt(0)));
      try{return {flag,name:(new Intl.DisplayNames(['en'],{type:'region'}).of(code)||code)+' ('+code+')'};}catch{return {flag,name:code};}
    }
    let trafficRecords=[];
    let trafficPage=1;
    const expandedIPDetails=new Set();
    function renderTraffic(){
      const size=Math.max(1,Number(document.getElementById('traffic-page-size').value)||25);
      const totalPages=Math.max(1,Math.ceil(trafficRecords.length/size));
      trafficPage=Math.min(Math.max(1,trafficPage),totalPages);
      const start=(trafficPage-1)*size;
      const pageItems=trafficRecords.slice(start,start+size);
      const rows=document.getElementById('rows');
      rows.replaceChildren();
      for(const v of pageItems){
        const tr=document.createElement('tr');
        for(const text of [new Date(v.time).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}),v.ip,v.visits]){
          const td=document.createElement('td');td.textContent=text;tr.append(td);
        }
        const countryCell=document.createElement('td');countryCell.className='country-cell';
        const country=document.createElement('span');country.className='country-badge';
        const info=countryInfo(v.country);
        const flag=document.createElement('span');flag.className='country-flag';flag.setAttribute('aria-hidden','true');flag.textContent=info.flag;
        const name=document.createElement('span');name.className='country-name';name.textContent=info.name;
        country.append(flag,name);countryCell.append(country);tr.append(countryCell);
        for(const text of [v.region||"Unknown",v.city||"Unknown",v.path]){
          const td=document.createElement('td');td.textContent=text;tr.append(td);
        }
        const sectionCell=document.createElement('td');
        const details=document.createElement('details');details.className='section-details';details.open=expandedIPDetails.has(v.ip);
        details.addEventListener('toggle',()=>{if(details.open)expandedIPDetails.add(v.ip);else expandedIPDetails.delete(v.ip);});
        const summary=document.createElement('summary');
        const sections=Array.isArray(v.sections)?v.sections:[];
        summary.textContent=sections.length?"Visited sections ("+sections.length+")":"No section history";
        details.append(summary);
        if(sections.length){
          const list=document.createElement('ul');list.className='section-visit-list';
          for(const section of sections){
            const item=document.createElement('li');
            const last=new Date(section.lastVisit).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
            item.textContent=section.name+" — "+section.visits+" visit"+(section.visits===1?"":"s")+" · Last: "+last;
            list.append(item);
          }
          details.append(list);
        }
        sectionCell.append(details);tr.append(sectionCell);rows.append(tr);
      }
      const first=trafficRecords.length?start+1:0;
      const last=Math.min(start+pageItems.length,trafficRecords.length);
      document.getElementById('traffic-page-info').textContent="Showing "+first+"–"+last+" of "+trafficRecords.length+" IPs · Page "+trafficPage+" of "+totalPages;
      document.getElementById('traffic-prev-page').disabled=trafficPage<=1;
      document.getElementById('traffic-next-page').disabled=trafficPage>=totalPages;
    }
    let popularPageRecords=[];
    function renderPopularPages(){
      const body=document.getElementById('popular-page-rows');
      body.replaceChildren();
      const visitorsByIP=new Map(trafficRecords.map(visitor=>[visitor.ip,visitor]));
      for(const [index,page] of popularPageRecords.entries()){
        const row=document.createElement('tr');
        const rank=document.createElement('td');rank.textContent=String(index+1);row.append(rank);
        const pageCell=document.createElement('td');
        const pageName=document.createElement('strong');pageName.textContent=page.section||"Page";
        const path=document.createElement('small');path.className='popular-page-path';path.textContent=page.path||"/";
        pageCell.append(pageName,path);row.append(pageCell);
        for(const value of [page.visits,Array.isArray(page.visitors)?page.visitors.length:0]){
          const cell=document.createElement('td');cell.textContent=String(value);row.append(cell);
        }
        const lastCell=document.createElement('td');lastCell.textContent=new Date(page.lastVisit).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});row.append(lastCell);
        const detailCell=document.createElement('td');
        const details=document.createElement('details');details.className='popular-details';
        const summary=document.createElement('summary');summary.textContent="Visitor details ("+(Array.isArray(page.visitors)?page.visitors.length:0)+")";details.append(summary);
        details.addEventListener('toggle',()=>{
          if(!details.open||details.dataset.loaded==="true")return;
          details.dataset.loaded="true";
          const list=document.createElement('ul');list.className='section-visit-list';
          for(const visitor of Array.isArray(page.visitors)?page.visitors:[]){
            const item=document.createElement('li');
            const geo=visitorsByIP.get(visitor.ip);
            const flag=countryInfo(geo?.country).flag;
            const last=new Date(visitor.lastVisit).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
            const location=[geo?.city,geo?.region].filter(Boolean).join(', ');
            item.textContent=flag+" "+visitor.ip+" — "+visitor.visits+" visit"+(visitor.visits===1?"":"s")+" · Last: "+last+(location?" · "+location:"");
            list.append(item);
          }
          if(!list.children.length){const empty=document.createElement('li');empty.textContent="No visitor details recorded.";list.append(empty);}
          details.append(list);
        });
        detailCell.append(details);row.append(detailCell);body.append(row);
      }
    }
    async function refresh(){
      try{
        const r=await fetch('/api/admin/traffic',{cache:'no-store'});
        if(r.status===401){location.href='/admin/login';return;}
        const d=await r.json();if(!r.ok)throw Error(d.error);
        document.getElementById('today-summary').textContent='Today ('+d.today.day+'): '+d.today.visitors+' visitors · '+d.today.views+' page views';
        document.getElementById('summary').textContent=d.views+' page views · '+d.uniqueIPs+' distinct IPs';
        trafficRecords=Array.isArray(d.records)?d.records:[];
        popularPageRecords=Array.isArray(d.popularPages)?d.popularPages:[];
        renderTraffic();
        renderPopularPages();
        document.getElementById('status').textContent=d.views?'':'No visits recorded yet.';
      }catch(e){document.getElementById('status').textContent=e.message||'Could not load traffic.';}
    }
    const SUBJECT_GROUPS=["Sociology","Education","Indian Economy","AI","Ethics","English","Malayalam"];
    let allResults=[];
    let currentPage=1;
    let repeatedIPTotal=0;
    function subjectGroup(value){
      const name=String(value||"").toLowerCase();
      if(/sociology/.test(name))return "Sociology";
      if(/education/.test(name))return "Education";
      if(/economy/.test(name))return "Indian Economy";
      if(/artificial intelligence|\bai\b|philosophy of mind/.test(name))return "AI";
      if(/ethic/.test(name))return "Ethics";
      if(/english/.test(name))return "English";
      if(/malayalam/.test(name))return "Malayalam";
      return "Other";
    }
    function isPassed(result){const status=String(result.status||"");return /pass/i.test(status) && !/fail|not pass|needs improvement|below pass/i.test(status);}
    function isBelowPass(result){return /needs improvement|below pass|not pass/i.test(String(result.status||""));}
    function isFailed(result){return /fail/i.test(String(result.status||"")) || isBelowPass(result);}
    function addCell(row,value){const cell=document.createElement('td');cell.textContent=value==null?"":String(value);row.append(cell);}
    function formatSubmitted(value){const date=new Date(value);return Number.isNaN(date.getTime())?String(value||"Unknown"):date.toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});}
    function renderResults(){
      const select=document.getElementById('subject-filter');
      const previous=select.value;
      select.replaceChildren(new Option("All subjects",""));
      for(const subject of SUBJECT_GROUPS) select.add(new Option(subject,subject));
      select.value=SUBJECT_GROUPS.includes(previous)?previous:"";
      const filter=select.value;
      const passed=allResults.filter(isPassed).length;
      const failed=allResults.filter(isFailed).length;
      const percentages=allResults.map(r=>Number(r.percentage)).filter(Number.isFinite);
      const average=percentages.length?percentages.reduce((a,b)=>a+b,0)/percentages.length:null;
      document.getElementById('attempt-total').textContent=String(allResults.length);
      document.getElementById('attempt-passed').textContent=String(passed);
      document.getElementById('attempt-failed').textContent=String(failed);
      document.getElementById('attempt-average').textContent=average===null?"—":average.toFixed(1)+"%";
      document.getElementById('repeated-ip-total').textContent=String(repeatedIPTotal);
      const grid=document.getElementById('subject-rows');grid.replaceChildren();
      for(const subject of SUBJECT_GROUPS){
        const items=allResults.filter(item=>subjectGroup(item.subject)===subject);
        const scores=items.map(item=>Number(item.percentage)).filter(Number.isFinite);
        const tests=new Set(items.map(item=>item.subject||"Unspecified"));
        const card=document.createElement('article');card.className='subject-card';
        const title=document.createElement('h3');title.textContent=subject;card.append(title);
        const subtitle=document.createElement('p');subtitle.className='subject-meta';subtitle.textContent=tests.size+" test"+(tests.size===1?"":"s");card.append(subtitle);
        const metrics=document.createElement('div');metrics.className='subject-metrics';
        const averageText=scores.length?(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1)+"%":"—";
        for(const entry of [["Attempts",items.length],["Passed",items.filter(isPassed).length],["Below pass",items.filter(isFailed).length],["Average marks",averageText]]){
          const metric=document.createElement('div');const label=document.createElement('span');label.textContent=entry[0];const value=document.createElement('strong');value.textContent=String(entry[1]);metric.append(label,value);metrics.append(metric);
        }
        card.append(metrics);grid.append(card);
      }
      const nameAttempts=new Map();
      for(const attempt of allResults){
        const key=String(attempt.name||"").trim().replace(/\\s+/g," ").toLowerCase();
        if(key)nameAttempts.set(key,(nameAttempts.get(key)||0)+1);
      }
      const filtered=allResults.filter(item=>!filter||subjectGroup(item.subject)===filter);
      const size=Math.max(1,Number(document.getElementById('page-size').value)||50);
      const totalPages=Math.max(1,Math.ceil(filtered.length/size));
      currentPage=Math.min(Math.max(1,currentPage),totalPages);
      const start=(currentPage-1)*size;
      const pageItems=filtered.slice(start,start+size);
      const body=document.getElementById('result-rows');body.replaceChildren();
      for(const item of pageItems){
        const row=document.createElement('tr');
        addCell(row,item.id);
        const nameCell=document.createElement('td');
        const attemptName=String(item.name||"");
        const normalizedName=attemptName.trim().replace(/\\s+/g," ").toLowerCase();
        const nameCount=nameAttempts.get(normalizedName)||0;
        nameCell.textContent=attemptName;
        if(nameCount>1){
          nameCell.className='repeat-name';
          nameCell.title=nameCount+" attempts under this name";
          nameCell.setAttribute('aria-label',attemptName+" — "+nameCount+" attempts");
          const countBadge=document.createElement('span');countBadge.className='name-repeat-count';countBadge.textContent="×"+nameCount;nameCell.append(countBadge);
        }
        row.append(nameCell);
        for(const value of [item.reg,item.subject,item.score,item.total])addCell(row,value);
        const markCell=document.createElement('td');
        const mark=document.createElement('span');
        mark.className='mark '+(isPassed(item)?'mark-pass':isBelowPass(item)?'mark-below':isFailed(item)?'mark-fail':'mark-neutral');
        mark.textContent=Number.isFinite(Number(item.percentage))?Number(item.percentage).toFixed(1)+'%':'—';
        markCell.append(mark);row.append(markCell);
        const repeatCount=Number(item.same_ip_attempts);
        const repeatCell=document.createElement('td');
        const repeatBadge=document.createElement('span');
        repeatBadge.className='repeat-count'+(Number.isFinite(repeatCount)&&repeatCount>1?' repeat-many':'');
        repeatBadge.textContent=Number.isFinite(repeatCount)?String(repeatCount):'—';
        repeatCell.append(repeatBadge);row.append(repeatCell);
        for(const value of [item.wrong,item.unanswered])addCell(row,value);
        const statusCell=document.createElement('td');
        const statusBadge=document.createElement('span');
        statusBadge.className='status-badge '+(isPassed(item)?'status-pass':isBelowPass(item)?'status-below':isFailed(item)?'status-fail':'status-neutral');
        statusBadge.textContent=item.status||"Unknown";statusCell.append(statusBadge);row.append(statusCell);
        for(const value of [item.auto_submitted?"Yes":"No",formatSubmitted(item.submitted_at)])addCell(row,value);
        body.append(row);
      }
      const first=filtered.length?start+1:0;
      const last=Math.min(start+pageItems.length,filtered.length);
      document.getElementById('page-info').textContent="Showing "+first+"–"+last+" of "+filtered.length+" · Page "+currentPage+" of "+totalPages;
      document.getElementById('prev-page').disabled=currentPage<=1;
      document.getElementById('next-page').disabled=currentPage>=totalPages;
      document.getElementById('results-status').textContent=allResults.length?(filter?"Showing "+filtered.length+" of "+allResults.length+" attempts for "+filter+".":"Showing "+allResults.length+" attempts across 7 subjects."):"No mock test attempts recorded yet.";
    }
    async function refreshResults(){
      const status=document.getElementById('results-status');status.textContent='Loading mock test results…';
      const button=document.getElementById('refresh-results');button.disabled=true;
      try{
        const response=await fetch('/api/admin/results',{cache:'no-store'});
        if(response.status===401){location.href='/admin/login';return;}
        const data=await response.json();if(!response.ok)throw Error(data.error||'Could not load mock test results.');
        allResults=Array.isArray(data.results)?data.results:[];
        repeatedIPTotal=Number(data.repeated_ip_total)||0;
        currentPage=1;
        renderResults();
      }catch(error){status.textContent=error.message||'Could not load mock test results.';if(!allResults.length){document.getElementById('attempt-total').textContent='—';document.getElementById('attempt-passed').textContent='—';document.getElementById('attempt-failed').textContent='—';document.getElementById('attempt-average').textContent='—';}}
      finally{button.disabled=false;}
    }
    document.getElementById('refresh-results').onclick=refreshResults;
    document.getElementById('subject-filter').onchange=()=>{currentPage=1;renderResults();};
    document.getElementById('page-size').onchange=()=>{currentPage=1;renderResults();};
    document.getElementById('prev-page').onclick=()=>{currentPage=Math.max(1,currentPage-1);renderResults();};
    document.getElementById('next-page').onclick=()=>{currentPage++;renderResults();};
    document.getElementById('dashboard-tab').onclick=()=>{document.getElementById('dashboard-panel').hidden=false;document.getElementById('attempts-panel').hidden=true;document.getElementById('dashboard-tab').setAttribute('aria-selected','true');document.getElementById('attempts-tab').setAttribute('aria-selected','false');};
    document.getElementById('attempts-tab').onclick=()=>{document.getElementById('dashboard-panel').hidden=true;document.getElementById('attempts-panel').hidden=false;document.getElementById('dashboard-tab').setAttribute('aria-selected','false');document.getElementById('attempts-tab').setAttribute('aria-selected','true');};
    function livePageLabel(item){const path=String(item.path||'/');const section=String(item.section||'').trim();if(path==='/'||path==='/index.html')return section&&section!=='Home'&&section!=='Overview'?'Home · '+section:'Home page';return section||path;}
    async function refreshLiveVisitors(){
      try{
        const response=await fetch('/api/admin/live-visitors',{cache:'no-store'});
        if(response.status===401){location.href='/admin/login';return;}
        const data=await response.json();if(!response.ok)throw Error(data.error||'Could not load live visitors.');
        const count=Number(data.active)||0;
        document.getElementById('live-summary').textContent=count+' active tab'+(count===1?'':'s')+' seen in the last 90 seconds';
        const grid=document.getElementById('live-pages');grid.replaceChildren();
        const pages=Array.isArray(data.pages)?data.pages:[];
        if(!count){const empty=document.createElement('p');empty.className='panel-intro';empty.textContent='No active visitors right now.';grid.append(empty);return;}
        for(const item of pages){
          const card=document.createElement('article');card.className='subject-card';
          const title=document.createElement('h3');title.textContent=livePageLabel(item);card.append(title);
          const meta=document.createElement('p');meta.className='subject-meta';const visitors=Number(item.count)||0;meta.textContent=visitors+' active tab'+(visitors===1?'':'s');card.append(meta);
          grid.append(card);
        }
      }catch(error){document.getElementById('live-summary').textContent=error.message||'Could not load live visitors.';}
    }
    function setTrafficTab(view){
      const live=view==='live';
      const popular=view==='popular';
      const chat=view==='chat';
      document.getElementById('visitors-panel').hidden=live||popular||chat;
      document.getElementById('popular-panel').hidden=!popular;
      document.getElementById('live-panel').hidden=!live;
      document.getElementById('chat-panel').hidden=!chat;
      document.getElementById('visitors-tab').setAttribute('aria-selected',String(!live&&!popular&&!chat));
      document.getElementById('popular-tab').setAttribute('aria-selected',String(popular));
      document.getElementById('live-tab').setAttribute('aria-selected',String(live));
      document.getElementById('chat-tab').setAttribute('aria-selected',String(chat));
      document.getElementById('visitors-tab').classList.toggle('active',!live&&!popular&&!chat);
      document.getElementById('popular-tab').classList.toggle('active',popular);
      document.getElementById('live-tab').classList.toggle('active',live);
      document.getElementById('chat-tab').classList.toggle('active',chat);
      if(chat)loadAdminChat();
    }
    document.getElementById('visitors-tab').onclick=()=>setTrafficTab(false);
    document.getElementById('popular-tab').onclick=()=>setTrafficTab('popular');
    document.getElementById('live-tab').onclick=()=>setTrafficTab('live');
    document.getElementById('chat-tab').onclick=()=>setTrafficTab('chat');
    if(location.hash==='#live')setTrafficTab('live');
    if(location.hash==='#chat')setTrafficTab('chat');
    async function loadAdminChat(){
      const status=document.getElementById('admin-chat-status');
      const rows=document.getElementById('admin-chat-rows');
      status.textContent='Loading community chat messages…';
      try{
        const response=await fetch('/api/chat',{cache:'no-store'});
        if(!response.ok)throw Error('Could not load chat messages.');
        const data=await response.json();
        const messages=Array.isArray(data.messages)?data.messages:[];
        rows.replaceChildren();
        if(!messages.length){
          status.textContent='No messages in community chat right now.';
          const tr=document.createElement('tr');
          const td=document.createElement('td');
          td.colSpan=4;
          td.textContent='No messages in community chat right now.';
          td.style.cssText='text-align:center;color:#64776f;padding:24px';
          tr.append(td);
          rows.append(tr);
          return;
        }
        status.textContent='Showing '+messages.length+' message'+(messages.length===1?'':'s')+'.';
        for(const msg of messages.slice().reverse()){
          const tr=document.createElement('tr');
          const tdTime=document.createElement('td');
          tdTime.textContent=new Date(msg.createdAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'});
          const tdName=document.createElement('td');
          const strong=document.createElement('strong');
          strong.textContent=msg.name;
          tdName.append(strong);
          const tdText=document.createElement('td');
          tdText.textContent=msg.text;
          const tdAct=document.createElement('td');
          const delBtn=document.createElement('button');
          delBtn.type='button';
          delBtn.textContent='Delete';
          delBtn.style.cssText='padding:5px 9px;background:#b33a3a;color:#fff;border:0;border-radius:6px;font-size:11px;cursor:pointer;font-weight:600';
          delBtn.onclick=async()=>{
            if(!confirm('Delete message from "'+msg.name+'"?'))return;
            delBtn.disabled=true;
            delBtn.textContent='Deleting…';
            try{
              const r=await fetch('/api/chat/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:msg.id})});
              const d=await r.json();
              if(!r.ok)throw Error(d.error||'Delete failed.');
              tr.remove();
              status.textContent='Message deleted successfully.';
            }catch(err){
              alert(err.message);
              delBtn.disabled=false;
              delBtn.textContent='Delete';
            }
          };
          tdAct.append(delBtn);
          tr.append(tdTime,tdName,tdText,tdAct);
          rows.append(tr);
        }
      }catch(error){status.textContent=error.message||'Could not load chat messages.';}
    }
    document.getElementById('admin-chat-refresh').onclick=()=>loadAdminChat();
    document.getElementById('admin-chat-clear').onclick=async()=>{
      if(!confirm('Are you sure you want to permanently delete ALL community chat messages? This cannot be undone.'))return;
      const status=document.getElementById('admin-chat-status');
      status.textContent='Clearing all messages…';
      try{
        const r=await fetch('/api/chat/clear',{method:'POST'});
        const d=await r.json();
        if(!r.ok)throw Error(d.error||'Failed to clear chat.');
        status.textContent='All messages cleared successfully.';
        loadAdminChat();
      }catch(err){
        status.textContent=err.message||'Failed to clear messages.';
      }
    };
    document.getElementById('traffic-page-size').onchange=()=>{trafficPage=1;renderTraffic();};
    document.getElementById('traffic-prev-page').onclick=()=>{trafficPage=Math.max(1,trafficPage-1);renderTraffic();};
    document.getElementById('traffic-next-page').onclick=()=>{trafficPage++;renderTraffic();};
    document.getElementById('refresh').onclick=refresh;
    document.getElementById('logout').onclick=async()=>{const r=await fetch('/api/admin/logout',{method:'POST'});if(r.ok)location.href='/admin/login';};
    refresh();refreshResults();refreshLiveVisitors();setInterval(()=>{if(!document.hidden){refresh();refreshLiveVisitors();}},15000);document.addEventListener("visibilitychange",()=>{if(!document.hidden){refresh();refreshLiveVisitors();}});` : `
    document.getElementById('login').onsubmit=async e=>{e.preventDefault();const button=e.target.querySelector('button');button.disabled=true;try{const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:document.getElementById('password').value})});const d=await r.json();document.getElementById('password').value='';if(!r.ok)throw Error(d.error);const next=new URLSearchParams(location.search).get('next');let destination='/admin/traffic';try{const target=next?new URL(next,location.origin):null;if(target&&target.origin===location.origin)destination=target.pathname+target.search+target.hash;}catch{}location.href=destination;}catch(e){document.getElementById('status').textContent=e.message||'Sign-in failed.';}finally{button.disabled=false;}};`;
  return new Response('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Academic Hub · Owner</title><style>body{background:#f2f6f3;color:#183b35;font:18px/1.6 system-ui;margin:0}main{max-width:1600px;width:calc(100% - 32px);box-sizing:border-box;margin:3vh auto;padding:clamp(12px,2vw,28px)}h1{font-size:40px}a{color:#28594e}form{max-width:420px;display:grid;gap:16px}input,button{font:inherit;border:1px solid #bdd2c7;border-radius:10px;padding:12px}button{background:#183b35;color:white;cursor:pointer}.actions{display:flex;gap:16px;align-items:center;flex-wrap:wrap} .table{overflow:auto;background:white;border-radius:12px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:14px;border-bottom:1px solid #e1e9e4}td{overflow-wrap:anywhere}.section-details{max-width:260px}.section-details summary{cursor:pointer;color:#28594e;font-weight:600}.section-visit-list{margin:8px 0 0;padding-left:18px}.section-visit-list li{margin:3px 0;white-space:normal;min-width:180px}#status{color:#914023}.results-section{margin-top:32px;padding-top:10px;border-top:2px solid #dce8e1}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px;margin:16px 0}.metric{display:grid;gap:4px;padding:14px;background:white;border:1px solid #dce8e1;border-radius:12px}.metric span{font-size:14px;color:#536a62}.metric strong{font-size:23px}.results-section select{font:inherit;border:1px solid #bdd2c7;border-radius:10px;padding:10px;background:white;color:#183b35}h3{margin-top:28px}.results-heading h2{margin-bottom:4px}.results-heading p,.panel-intro{margin-top:0;color:#536a62;font-size:13px}.results-section{font-size:14px}.results-section h3{margin:0}.results-tabs{display:flex;gap:8px;margin:18px 0 12px;border-bottom:1px solid #dce8e1}.results-tab{font:600 14px/1.2 system-ui;border:1px solid #bdd2c7;border-bottom:0;border-radius:9px 9px 0 0;padding:9px 15px;background:#e8f0eb;color:#183b35}.results-tab[aria-selected=true],.results-tab.active{background:#183b35;color:#fff}.subject-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:10px}.subject-card{padding:14px;background:#fff;border:1px solid #dce8e1;border-radius:12px;box-shadow:0 2px 8px rgba(24,59,53,.04)}.subject-card h3{font-size:16px;margin:0}.subject-meta{font-size:12px;color:#64776f;margin:2px 0 10px}.subject-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px}.subject-metrics div{display:grid;gap:2px;padding:7px 8px;background:#f5f8f6;border-radius:8px}.subject-metrics span{font-size:11px;color:#536a62}.subject-metrics strong{font-size:15px}.attempt-actions{gap:8px;margin:12px 0}.attempt-actions select{font-size:13px;padding:7px 9px}.attempt-table{overflow:hidden}.attempt-table table{width:100%;min-width:0;table-layout:fixed}.attempt-table th,.attempt-table td{font-size:10px;line-height:1.25;white-space:normal;overflow-wrap:anywhere;padding:5px 4px;vertical-align:middle}.attempt-table th:nth-child(1){width:4%}.attempt-table th:nth-child(2){width:10%}.attempt-table th:nth-child(3){width:9%}.attempt-table th:nth-child(4){width:11%}.attempt-table th:nth-child(5){width:5%}.attempt-table th:nth-child(6){width:5%}.attempt-table th:nth-child(7){width:6%}.attempt-table th:nth-child(8){width:10%}.attempt-table th:nth-child(9){width:5%}.attempt-table th:nth-child(10){width:7%}.attempt-table th:nth-child(11){width:8%}.attempt-table th:nth-child(12){width:7%}.attempt-table th:nth-child(13){width:13%}.mark,.repeat-count{display:inline-block;min-width:46px;text-align:center;padding:2px 7px;border-radius:999px;font-weight:700}.mark-pass{background:#dcf5e5;color:#15542b}.mark-fail{background:#ffe0df;color:#8d1b17}.mark-below{background:#fff0cf;color:#805600}.mark-neutral{background:#fff0cf;color:#805600}.repeat-count{background:#edf2ef;color:#475a52}.repeat-many{background:#fff0cf;color:#805600}.pagination{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:10px 0 2px;font-size:12px;color:#435a51}.page-size-label{display:flex;align-items:center;gap:6px}.pagination select{font:inherit;padding:5px 7px}.pagination button{font:600 12px/1.2 system-ui;padding:7px 10px;border:1px solid #bfd0c7;border-radius:8px;background:#183b35;color:white}.pagination button:disabled{opacity:.45;cursor:not-allowed}.page-controls{display:flex;gap:6px}@media(max-width:700px){.attempt-table th:nth-child(1),.attempt-table td:nth-child(1),.attempt-table th:nth-child(3),.attempt-table td:nth-child(3),.attempt-table th:nth-child(9),.attempt-table td:nth-child(9),.attempt-table th:nth-child(10),.attempt-table td:nth-child(10),.attempt-table th:nth-child(12),.attempt-table td:nth-child(12),.attempt-table th:nth-child(13),.attempt-table td:nth-child(13){display:none}.attempt-table th:nth-child(2){width:22%}.attempt-table th:nth-child(4){width:25%}.attempt-table th:nth-child(5){width:10%}.attempt-table th:nth-child(6){width:10%}.attempt-table th:nth-child(7){width:10%}.attempt-table th:nth-child(8){width:13%}.attempt-table th:nth-child(11){width:10%}.attempt-table th,.attempt-table td{font-size:9px;padding:4px 2px}}@media(max-width:600px){.results-tab{padding:8px 11px}.pagination{justify-content:flex-start}.page-info{flex:1 1 100%;order:2}.page-controls{margin-left:auto}}.traffic-tabs{display:flex;gap:8px;margin:18px 0 12px;border-bottom:1px solid #dce8e1}.traffic-tab{font:600 14px/1.2 system-ui;border:1px solid #bdd2c7;border-bottom:0;border-radius:9px 9px 0 0;padding:9px 15px;background:#e8f0eb;color:#183b35}.traffic-tab[aria-selected=true],.traffic-tab.active{background:#183b35;color:#fff}.traffic-panel[hidden]{display:none}.popular-pages-table{max-height:680px;border:1px solid #dce8e1}.popular-pages-table table{min-width:900px;table-layout:fixed}.popular-pages-table th,.popular-pages-table td{font-size:13px;line-height:1.35;padding:9px 10px;vertical-align:top}.popular-pages-table thead th{position:sticky;top:0;z-index:2;background:#eef4f0;color:#536a62;font-size:11px;text-transform:uppercase;letter-spacing:.03em}.popular-pages-table th:nth-child(1){width:6%}.popular-pages-table th:nth-child(2){width:25%}.popular-pages-table th:nth-child(3){width:9%}.popular-pages-table th:nth-child(4){width:9%}.popular-pages-table th:nth-child(5){width:20%}.popular-pages-table th:nth-child(6){width:31%}.popular-page-path{display:block;margin-top:3px;color:#64776f;font-size:11px;overflow-wrap:anywhere}.popular-details{min-width:190px}.popular-details summary{cursor:pointer;color:#28594e;font-weight:700}.repeat-name{font-weight:800;color:#a51d27}.name-repeat-count{display:inline-block;margin-left:5px;padding:1px 5px;border-radius:999px;background:#fde9e9;color:#a51d27;font-size:9px;line-height:1.25;font-weight:800;vertical-align:middle}..traffic-table{max-height:680px;border:1px solid #dce8e1}.traffic-table table{min-width:1180px;table-layout:fixed}.traffic-table th,.traffic-table td{font-size:13px;line-height:1.35;padding:9px 10px;vertical-align:top}.traffic-table th:nth-child(1){width:15%}.traffic-table th:nth-child(2){width:15%}.traffic-table th:nth-child(3){width:7%}.traffic-table th:nth-child(4){width:13%}.traffic-table th:nth-child(5){width:12%}.traffic-table th:nth-child(6){width:10%}.traffic-table th:nth-child(7){width:11%}.traffic-table th:nth-child(8){width:17%}.traffic-table thead th{position:sticky;top:0;z-index:2;background:#eef4f0;color:#536a62;font-size:11px;text-transform:uppercase;letter-spacing:.03em}.traffic-table tbody tr:nth-child(even),.attempt-table tbody tr:nth-child(even){background:#f8faf9}.traffic-table tbody tr:hover,.attempt-table tbody tr:hover{background:#eef6f1}.country-cell{white-space:nowrap}.country-badge{display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:4px 8px;border:1px solid #dce8e1;border-radius:999px;background:#f2f7f4;white-space:nowrap}.country-flag{font-size:16px;line-height:1}.country-name{font-size:12px;font-weight:600;color:#344e44}.section-details{max-width:230px}.section-details summary{cursor:pointer;color:#28594e;font-weight:700}.section-visit-list{margin:8px 0 0;padding-left:18px}.section-visit-list li{margin:4px 0;white-space:normal;min-width:180px}.traffic-pagination{margin:10px 0 20px}.attempt-table thead th{background:#eef4f0;color:#41594f;font-size:10px;text-transform:uppercase;letter-spacing:.02em}.status-badge{display:inline-block;padding:3px 7px;border-radius:999px;font-size:9px;line-height:1.25;font-weight:700;text-align:center;white-space:normal}.status-pass{background:#dcf5e5;color:#15542b}.status-below{background:#fff0cf;color:#805600}.status-fail{background:#ffe0df;color:#8d1b17}.status-neutral{background:#edf2ef;color:#475a52}</style></head><body><main>'+content+'</main><script>'+script+'</script></body></html>',{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'","Referrer-Policy":"no-referrer"}});
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
  const ipCounts = new Map();
  for (const item of results) {
    const ip = typeof item.ip_address === "string" ? item.ip_address.trim().toLowerCase() : "";
    if (ip) ipCounts.set(ip, (ipCounts.get(ip) || 0) + 1);
  }
  const repeatedIPTotal = Array.from(ipCounts.values()).filter(count => count > 1).length;
  return json({repeated_ip_total:repeatedIPTotal,results:results.map((item) => {
    const ip = typeof item.ip_address === "string" ? item.ip_address.trim().toLowerCase() : "";
    return {
    id:Number.isFinite(Number(item.id)) ? Number(item.id) : "",
    name:typeof item.name === "string" ? item.name.slice(0,120) : "",
    reg:typeof item.reg === "string" ? item.reg.slice(0,80) : "",
    subject:typeof item.subject === "string" ? item.subject.slice(0,80) : "",
    score:Number.isFinite(Number(item.score)) ? Number(item.score) : null,
    total:Number.isFinite(Number(item.total)) ? Number(item.total) : null,
    percentage:Number.isFinite(Number(item.percentage)) ? Number(item.percentage) : null,
    same_ip_attempts:ip ? ipCounts.get(ip) : null,
    wrong:Number.isFinite(Number(item.wrong)) ? Number(item.wrong) : null,
    unanswered:Number.isFinite(Number(item.unanswered)) ? Number(item.unanswered) : null,
    status:typeof item.status === "string" ? item.status.slice(0,40) : "",
    auto_submitted:Boolean(Number(item.auto_submitted)),
    submitted_at:typeof item.submitted_at === "string" ? item.submitted_at.slice(0,100) : ""
    };
  })});
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

async function isAuthorizedModerator(request, env, room, fallbackPassword) {
  if (typeof env.ADMIN_PASSWORD !== "string" || env.ADMIN_PASSWORD.length < 16) return false;
  const headerPass = request.headers.get("X-Admin-Password") || fallbackPassword;
  if (headerPass && typeof headerPass === "string") {
    const expected = await digest(env.ADMIN_PASSWORD);
    const actual = await digest(headerPass);
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
    if (!mismatch) return true;
  }
  try {
    const session = await room.fetch(await adminRequest(request, env, "https://internal/admin/api/admin/session"));
    if (session.ok) return true;
  } catch {}
  return false;
}

// A dedicated namespace owned by this Worker keeps admin storage separate from legacy chat.
export class OwnerTraffic extends StudyHubChat {}

function indiaDay(time) { return new Date(time + 330*60*1000).toISOString().slice(0,10); }

function groupPopularPages(events) {
  const groups=new Map();
  for(const event of events) {
    const key=JSON.stringify([event.path||"/",event.section||"Page"]);
    let page=groups.get(key);
    if(!page) {
      page={path:event.path||"/",section:event.section||"Page",visits:0,lastVisit:0,visitors:new Map()};
      groups.set(key,page);
    }
    page.visits++;
    page.lastVisit=Math.max(page.lastVisit,event.time||0);
    const visitor=page.visitors.get(event.ip)||{ip:event.ip,visits:0,lastVisit:0};
    visitor.visits++;
    visitor.lastVisit=Math.max(visitor.lastVisit,event.time||0);
    page.visitors.set(event.ip,visitor);
  }
  return Array.from(groups.values()).map(page=>({...page,visitors:Array.from(page.visitors.values()).sort((a,b)=>b.visits-a.visits||b.lastVisit-a.lastVisit)})).sort((a,b)=>b.visits-a.visits||b.lastVisit-a.lastVisit);
}

function groupTrafficByIP(records, sectionEvents = []) {
  const groups = new Map();
  for (const record of records.slice().sort((a,b)=>b.time-a.time)) {
    let group = groups.get(record.ip);
    if (!group) {
      group = {...record,visits:0,sections:new Map()};
      groups.set(record.ip,group);
    }
    group.visits++;
    // Older records may fill missing geo metadata; keep the latest visit and page.
    if ((!group.country || group.country === "XX") && record.country && record.country !== "XX") group.country=record.country;
    if (!group.region && record.region) group.region=record.region;
    if (!group.city && record.city) group.city=record.city;
  }
  for (const event of sectionEvents) {
    let group=groups.get(event.ip);
    if (!group) {
      group={ip:event.ip,time:event.time,path:event.path,visits:0,country:"XX",region:"",city:"",sections:new Map()};
      groups.set(event.ip,group);
    }
    if (event.time>group.time) { group.time=event.time; group.path=event.path; }
    const section=group.sections.get(event.section) || {name:event.section,visits:0,lastVisit:0};
    section.visits++;
    section.lastVisit=Math.max(section.lastVisit,event.time);
    group.sections.set(event.section,section);
  }
  return Array.from(groups.values()).map(group=>({...group,sections:Array.from(group.sections.values()).sort((a,b)=>b.lastVisit-a.lastVisit)})).sort((a,b)=>b.time-a.time);
}

