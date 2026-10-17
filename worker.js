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
      const origin = request.headers.get("Origin");
      if (origin && origin !== url.origin) return json({error:"Forbidden"},403);
      let input; try { input = await request.json(); } catch { return json({error:"Invalid request."},400); }
      const isMod = await isAuthorizedModerator(request, env, room, input?.adminPassword);
      if (!isMod) return json({error:"Unauthorized. Moderator login required."},401);
      const msgId = String(input?.id || "").trim();
      if (!msgId) return json({error:"Missing message ID."},400);
      const chat = env.CHAT_ROOM.get(env.CHAT_ROOM.idFromName("ba-sociology-semester-chat"));
      return chat.fetch(new Request("https://internal/internal/chat/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msgId })
      }));
    }
    if (url.pathname === "/api/chat/clear") {
      if (request.method !== "POST") return json({error:"Method not allowed."},405);
      const origin = request.headers.get("Origin");
      if (origin && origin !== url.origin) return json({error:"Forbidden"},403);
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
      const id = String(input?.id || "").trim();
      if (!id) return json({ error: "Message ID is required." }, 400);
      let stored = (await this.state.storage.get("messages")) || [];
      const beforeCount = stored.length;
      stored = stored.filter(m => String(m.id || "").trim() !== id);
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
    if (path === "/admin/api/admin/session" || path === "/admin/admin/traffic") return json({ok:true});
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
  const content = authorized ? `
<header class="hud-header">
  <div class="brand-title">
    <div class="brand-radar"></div>
    <div class="brand-text">
      <h1>ACADEMIC HUB // CONTROL ROOM <span>v3.0 ENTERPRISE</span></h1>
      <div class="brand-sub">OPERATIONS WATCH & TELEMETRY CENTER · PRIVATE OWNER ACCESS</div>
    </div>
  </div>

  <div class="hud-clocks">
    <div class="clock-item">
      <span class="clock-label">SYSTEM TIME (IST)</span>
      <span class="clock-time" id="ist-clock">Loading...</span>
    </div>
    <div class="clock-item">
      <span class="clock-label">COORDINATED UNIVERSAL</span>
      <span class="clock-time" id="utc-clock">Loading...</span>
    </div>
    <div class="clock-item">
      <span class="clock-label">RADAR LINK</span>
      <span class="clock-time" id="radar-link-status" style="color:var(--accent-emerald)">● NOMINAL</span>
    </div>
  </div>

  <div class="hud-actions">
    <button class="btn btn-primary" id="btn-force-sync" type="button">⚡ FORCE REFRESH</button>
    <label class="refresh-rate-label" for="sync-interval">
      SYNC:
      <select id="sync-interval" class="select-inline">
        <option value="15000" selected>15s</option>
        <option value="30000">30s</option>
        <option value="60000">60s</option>
        <option value="0">PAUSE</option>
      </select>
    </label>
    <a href="/" class="btn">HUB HOME</a>
    <button class="btn btn-danger" id="logout" type="button">SIGN OUT</button>
  </div>
</header>

<section class="kpi-grid">
  <div class="kpi-card live">
    <div class="kpi-head">
      <span class="kpi-title">LIVE ACTIVE NOW</span>
      <span class="kpi-badge live">● 90s RADAR</span>
    </div>
    <div class="kpi-val"><span id="live-active-count">0</span> <small>CONCURRENT</small></div>
    <div class="kpi-foot">
      <span>Spread across</span>
      <span class="highlight" id="live-pages-summary">checking active tabs...</span>
    </div>
  </div>

  <div class="kpi-card today">
    <div class="kpi-head">
      <span class="kpi-title">TODAY'S INGRESS (IST)</span>
      <span class="kpi-badge today" id="today-badge">TODAY</span>
    </div>
    <div class="kpi-val"><span id="today-visitors">0</span> <small>VISITORS</small></div>
    <div class="kpi-foot">
      <span class="highlight" id="today-views">0</span> page views · <span id="today-ratio">0</span> views/user
    </div>
  </div>

  <div class="kpi-card buffer">
    <div class="kpi-head">
      <span class="kpi-title">7-DAY TELEMETRY BUFFER</span>
      <span class="kpi-badge total">ROLLING</span>
    </div>
    <div class="kpi-val"><span id="buffer-views">0</span> <small>LOGS</small></div>
    <div class="kpi-foot">
      <span class="highlight" id="buffer-ips">0</span> distinct IPs · <span id="buffer-repeats">0%</span> repeat
    </div>
  </div>

  <div class="kpi-card tests">
    <div class="kpi-head">
      <span class="kpi-title">ASSESSMENT ENGINE</span>
      <span class="kpi-badge tests">7 SUBJECTS</span>
    </div>
    <div class="kpi-val"><span id="test-total-attempts">0</span> <small>ATTEMPTS</small></div>
    <div class="kpi-foot">
      <span class="highlight" style="color:var(--accent-emerald)" id="test-pass-rate">0% PASS</span> · <span id="test-avg-score">0% AVG</span>
    </div>
  </div>
</section>

<nav class="nav-tabs" role="tablist">
  <button class="tab-btn active" id="tab-btn-assessment" type="button" role="tab" aria-selected="true">🎯 ASSESSMENT MATRIX <span class="badge-pill" id="badge-total-tests">0</span></button>
  <button class="tab-btn" id="tab-btn-radar" type="button" role="tab" aria-selected="false">🛰️ LIVE RADAR PRESENCE <span class="badge-pill" id="badge-live-tabs">0 ACTIVE</span></button>
  <button class="tab-btn" id="tab-btn-geo" type="button" role="tab" aria-selected="false">🌍 GEO & NETWORK INTELLIGENCE <span class="badge-pill" id="badge-total-ips">0 IPs</span></button>
  <button class="tab-btn" id="tab-btn-content" type="button" role="tab" aria-selected="false">📊 CONTENT LEADERBOARD <span class="badge-pill" id="badge-total-pages">0</span></button>
  <button class="tab-btn" id="tab-btn-chat" type="button" role="tab" aria-selected="false">💬 COMMUNITY CHAT <span class="badge-pill">MOD</span></button>
</nav>

<main class="control-panel">
  <!-- STATION 1: MOCK TEST COMMAND CENTER -->
  <section class="station-card" id="panel-assessment">
    <div class="station-header">
      <div>
        <h2><span class="station-dot"></span> 7-SUBJECT ASSESSMENT TELEMETRY MATRIX</h2>
        <p class="station-desc">Automated scoring diagnostics, pass-rate gauges, and student performance across all 7 semester disciplines.</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" id="btn-export-results" type="button">📥 EXPORT RESULTS CSV</button>
        <button class="btn" id="refresh-results" type="button">🔄 REFRESH ATTEMPTS</button>
      </div>
    </div>

    <!-- 7 SUBJECT MATRIX CARDS -->
    <div class="subject-grid" id="subject-cards-grid">
      <!-- Generated dynamically -->
    </div>

    <!-- SCORE SPECTRUM HISTOGRAM -->
    <div class="spectrum-box">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:11px; font-family:var(--font-mono); font-weight:700; color:var(--text-muted); text-transform:uppercase;">Score Distribution Spectrum (<span id="spectrum-total">0</span> Total Attempts)</span>
        <span style="font-size:11px; font-family:var(--font-mono); color:var(--accent-emerald);" id="spectrum-pass-rate">0% Passed Standards (>=40%)</span>
      </div>
      <div class="spectrum-bar">
        <div class="spectrum-seg distinction" id="seg-distinction" style="width: 25%;" title="Distinction (>=80%)"></div>
        <div class="spectrum-seg merit" id="seg-merit" style="width: 25%;" title="Very Good (60-79%)"></div>
        <div class="spectrum-seg pass" id="seg-pass" style="width: 25%;" title="Pass Standard (40-59%)"></div>
        <div class="spectrum-seg fail" id="seg-fail" style="width: 25%;" title="Below Pass (<40%)"></div>
      </div>
      <div class="spectrum-legend">
        <div class="legend-item"><span class="legend-dot distinction"></span> Distinction [80-100%]: <strong id="count-distinction">0</strong> (<span id="pct-distinction">0%</span>)</div>
        <div class="legend-item"><span class="legend-dot merit"></span> Very Good [60-79%]: <strong id="count-merit">0</strong> (<span id="pct-merit">0%</span>)</div>
        <div class="legend-item"><span class="legend-dot pass"></span> Pass Standard [40-59%]: <strong id="count-pass">0</strong> (<span id="pct-pass">0%</span>)</div>
        <div class="legend-item"><span class="legend-dot fail"></span> Below Pass [&lt;40%]: <strong id="count-fail">0</strong> (<span id="pct-fail">0%</span>)</div>
      </div>
    </div>

    <!-- FILTER & SEARCH HUD -->
    <div class="filter-row">
      <input type="text" class="search-input" id="result-search-input" placeholder="🔍 Search Student Name, ID, Subject, or Reg #..." value="">
      <select class="filter-select" id="subject-filter">
        <option value="">All 7 Subjects</option>
      </select>
      <select class="filter-select" id="grade-filter">
        <option value="">Performance: All Marks</option>
        <option value="distinction">Distinction (>=80%)</option>
        <option value="pass">Passed Standard (>=40%)</option>
        <option value="fail">Below Pass / Needs Improvement (&lt;40%)</option>
      </select>
      <select class="filter-select" id="identity-filter">
        <option value="">Identity: All Submissions</option>
        <option value="named">Named Students Only</option>
        <option value="anon">Legacy Anonymous Only</option>
      </select>
      <select class="filter-select" id="page-size">
        <option value="25">25 per page</option>
        <option value="50" selected>50 per page</option>
        <option value="100">100 per page</option>
        <option value="250">250 per page</option>
      </select>
    </div>

    <p id="results-status" role="status" style="font-size:12px; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:10px;">Loading mock test results...</p>

    <!-- DETAILED ATTEMPTS TABLE (WITH RECTIFIED NAMES & SUBJECTS) -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Identity</th>
            <th>Registration</th>
            <th>Test Discipline / Subject</th>
            <th>Score</th>
            <th>Mark %</th>
            <th>Performance Status</th>
            <th>Wrong</th>
            <th>Skipped</th>
            <th>Device Attempt</th>
            <th>Submission Mode</th>
            <th>Timestamp (IST)</th>
          </tr>
        </thead>
        <tbody id="result-rows">
          <!-- Rendered dynamically -->
        </tbody>
      </table>
    </div>

    <div class="pagination-bar">
      <span id="page-info" class="page-info">Page 1 of 1</span>
      <div class="page-controls">
        <button class="btn" id="prev-page" type="button" disabled>◀ PREVIOUS</button>
        <button class="btn" id="next-page" type="button" disabled>NEXT ▶</button>
      </div>
    </div>
  </section>

  <!-- STATION 2: LIVE AUDIENCE RADAR -->
  <section class="station-card" id="panel-radar" hidden>
    <div class="station-header">
      <div>
        <h2><span class="station-dot"></span> LIVE AUDIENCE RADAR (CONCURRENT TABS STREAM)</h2>
        <p class="station-desc">Telemetry active within the last 90 seconds. Highlights concurrent study clusters and live mock test sessions.</p>
      </div>
      <div>
        <span style="font-size:12px; font-family:var(--font-mono); color:var(--accent-emerald);" id="radar-summary-text">● CHECKING RADAR...</span>
      </div>
    </div>

    <div class="radar-grid" id="live-pages-grid">
      <!-- Rendered dynamically -->
    </div>
  </section>

  <!-- STATION 3: GEO & NETWORK INTELLIGENCE -->
  <section class="station-card" id="panel-geo" hidden>
    <div class="station-header">
      <div>
        <h2><span class="station-dot"></span> GLOBAL INGRESS & NETWORK AUDIT LOG</h2>
        <p class="station-desc">Deep telemetry records by visitor IP, regional geolocations, visit velocity, and chronological section breadcrumbs.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btn-export-traffic" type="button">📥 EXPORT TRAFFIC CSV</button>
      </div>
    </div>

    <!-- COUNTRY BREAKDOWN CARDS -->
    <div class="country-grid" id="country-summary-grid">
      <!-- Rendered dynamically -->
    </div>

    <div class="filter-row">
      <input type="text" class="search-input" id="traffic-search-input" placeholder="🔍 Search IP Address, City, Country, or Page Path..." value="">
      <select class="filter-select" id="traffic-page-size">
        <option value="25" selected>25 rows</option>
        <option value="50">50 rows</option>
        <option value="100">100 rows</option>
      </select>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Last Active (IST)</th>
            <th>Visitor IP Address</th>
            <th>Total Visits</th>
            <th>Country / Region</th>
            <th>State / City</th>
            <th>Current Active Page</th>
            <th>Section Trail History</th>
          </tr>
        </thead>
        <tbody id="rows">
          <!-- Rendered dynamically -->
        </tbody>
      </table>
    </div>

    <div class="pagination-bar">
      <span id="traffic-page-info" class="page-info">Page 1 of 1</span>
      <div class="page-controls">
        <button class="btn" id="traffic-prev-page" type="button" disabled>◀ PREVIOUS</button>
        <button class="btn" id="traffic-next-page" type="button" disabled>NEXT ▶</button>
      </div>
    </div>
  </section>

  <!-- STATION 4: CONTENT LEADERBOARD -->
  <section class="station-card" id="panel-content" hidden>
    <div class="station-header">
      <div>
        <h2><span class="station-dot"></span> CONTENT POPULARITY & ACCESS LEADERBOARD</h2>
        <p class="station-desc">Ranked by section visits and unique student readers since tracking began.</p>
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Learning Page / Section</th>
            <th>Total Views</th>
            <th>Unique Visitors</th>
            <th>Views / Visitor Ratio</th>
            <th>Last Activity (IST)</th>
            <th>Visitor IP Deep Audit</th>
          </tr>
        </thead>
        <tbody id="popular-page-rows">
          <!-- Rendered dynamically -->
        </tbody>
      </table>
    </div>
  </section>

  <!-- STATION 5: COMMUNITY CHAT MODERATION -->
  <section class="station-card" id="panel-chat" hidden>
    <div class="station-header">
      <div>
        <h2><span class="station-dot"></span> COMMUNITY CHAT TACTICAL INTERCEPT & MODERATION</h2>
        <p class="station-desc">Live intercept of student peer chat. Monitor discussion, remove spam, or wipe room on command.</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" id="admin-chat-refresh" type="button">🔄 REFRESH CHAT</button>
        <button class="btn btn-danger" id="admin-chat-clear" type="button">⚠️ CLEAR ALL MESSAGES</button>
      </div>
    </div>
    <p id="admin-chat-status" role="status" style="font-size:12px; font-family:var(--font-mono); color:var(--text-dim); margin-bottom:10px;"></p>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th style="width:160px">Timestamp (IST)</th>
            <th style="width:180px">Student Identity</th>
            <th>Message Body</th>
            <th style="width:110px">Moderation</th>
          </tr>
        </thead>
        <tbody id="admin-chat-rows">
          <!-- Rendered dynamically -->
        </tbody>
      </table>
    </div>
  </section>
</main>
` : `
<div class="login-wrapper">
  <div class="login-box">
    <div class="brand-radar" style="margin: 0 auto 16px;"></div>
    <h2>ACADEMIC HUB // CONTROL ROOM</h2>
    <p class="login-sub">RESTRICTED ACCESS · ENTERPRISE OWNER AUTHENTICATION</p>
    <form id="login">
      <div class="login-field">
        <label for="password">OWNER SECURITY KEY</label>
        <input id="password" type="password" autocomplete="current-password" required maxlength="1024" placeholder="Enter owner admin password...">
      </div>
      <button class="btn btn-primary" style="width:100%; justify-content:center; padding:12px; margin-top:8px;" type="submit">AUTHENTICATE & ENTER</button>
    </form>
    <p id="status" role="status" class="login-status"></p>
    <div style="margin-top:20px; border-top:1px solid rgba(255,255,255,0.06); padding-top:14px;">
      <a href="/" class="btn" style="width:100%; justify-content:center;">RETURN TO ACADEMIC HUB</a>
    </div>
  </div>
</div>
`;

  const styles = `
:root {
  --bg-core: #070b12;
  --bg-surface: #0e1524;
  --bg-surface-elevated: #141e33;
  --bg-card: rgba(18, 28, 48, 0.75);
  --border-subtle: rgba(56, 189, 248, 0.15);
  --border-glow: rgba(16, 185, 129, 0.4);
  --accent-cyan: #06b6d4;
  --accent-emerald: #10b981;
  --accent-amber: #f59e0b;
  --accent-rose: #f43f5e;
  --accent-indigo: #6366f1;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: var(--bg-core);
  background-image: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.12), transparent),
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px, 32px 32px;
  color: var(--text-main);
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.5;
  min-height: 100vh;
  padding: 16px 20px 60px;
}

/* TOP COMMAND HUD */
.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 14px 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}
.brand-title { display: flex; align-items: center; gap: 12px; }
.brand-radar {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 12px var(--accent-emerald);
  position: relative;
}
.brand-radar::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--accent-emerald);
  opacity: 0.7;
  animation: radar-pulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes radar-pulse {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
.brand-text h1 {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-text h1 span {
  color: var(--accent-cyan);
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 11px;
  padding: 2px 6px;
  background: rgba(6, 182, 212, 0.12);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 4px;
}
.brand-sub {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: var(--font-mono);
}

.hud-clocks {
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: var(--font-mono);
  background: rgba(0, 0, 0, 0.35);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.clock-item { display: flex; flex-direction: column; }
.clock-label { font-size: 9px; color: var(--text-dim); letter-spacing: 0.05em; text-transform: uppercase; }
.clock-time { font-size: 14px; font-weight: 700; color: var(--accent-cyan); }

.hud-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.refresh-rate-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); display: inline-flex; align-items: center; gap: 4px; }
.select-inline {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--accent-cyan);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 4px 6px;
  border-radius: 4px;
}
.btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface-elevated);
  color: var(--text-main);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
}
.btn:hover { background: rgba(6, 182, 212, 0.15); border-color: var(--accent-cyan); color: #fff; }
.btn-primary {
  background: linear-gradient(135deg, #0e7490, #0891b2);
  border-color: #06b6d4;
  color: #fff;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}
.btn-danger {
  background: rgba(244, 63, 94, 0.15);
  border-color: rgba(244, 63, 94, 0.4);
  color: var(--accent-rose);
}
.btn-danger:hover { background: rgba(244, 63, 94, 0.3); color: #fff; }

/* TOP KPI METRICS GRID */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}
.kpi-card {
  background: var(--bg-card);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 14px 18px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
.kpi-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; }
.kpi-card.live::before { background: var(--accent-emerald); }
.kpi-card.today::before { background: var(--accent-cyan); }
.kpi-card.buffer::before { background: var(--accent-indigo); }
.kpi-card.tests::before { background: var(--accent-amber); }

.kpi-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.kpi-title { font-size: 11px; font-family: var(--font-mono); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
.kpi-badge { font-size: 9px; font-family: var(--font-mono); font-weight: 700; padding: 2px 6px; border-radius: 999px; text-transform: uppercase; }
.kpi-badge.live { background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); }
.kpi-badge.today { background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); }
.kpi-badge.total { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
.kpi-badge.tests { background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); }

.kpi-val { font-size: 26px; font-weight: 800; font-family: var(--font-mono); color: #fff; line-height: 1.1; margin-bottom: 6px; }
.kpi-val small { font-size: 13px; font-weight: 500; color: var(--text-dim); }
.kpi-foot { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-dim); font-family: var(--font-mono); }
.kpi-foot span.highlight { color: var(--text-main); font-weight: 600; }

/* NAVIGATION TABS */
.nav-tabs {
  display: flex;
  gap: 6px;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 2px;
}
.tab-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.tab-btn:hover { color: #fff; background: var(--bg-surface-elevated); }
.tab-btn.active {
  background: var(--bg-surface-elevated);
  color: #fff;
  border-color: var(--accent-cyan);
  border-bottom: 2px solid var(--accent-cyan);
  box-shadow: 0 -2px 10px rgba(6, 182, 212, 0.15);
}
.tab-btn .badge-pill { font-size: 9px; padding: 1px 6px; border-radius: 999px; background: rgba(255, 255, 255, 0.1); }
.tab-btn.active .badge-pill { background: var(--accent-cyan); color: #000; font-weight: 800; }

/* CONTROL ROOM PANELS */
.control-panel { display: grid; gap: 20px; }
.station-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.station-card[hidden] { display: none !important; }
.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.station-header h2 { font-size: 15px; font-weight: 700; letter-spacing: 0.03em; color: #fff; display: flex; align-items: center; gap: 10px; }
.station-header h2 .station-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-cyan); box-shadow: 0 0 8px var(--accent-cyan); }
.station-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

/* 7 SUBJECT GRID */
.subject-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px; margin-bottom: 20px; }
.subject-box {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.subject-box:hover { transform: translateY(-2px); border-color: var(--accent-cyan); }
.subject-box.active-filter { border-color: var(--accent-cyan); box-shadow: 0 0 12px rgba(6, 182, 212, 0.3); }
.subject-box-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.subject-name { font-size: 13px; font-weight: 700; color: #fff; }
.subject-tests-count { font-size: 10px; font-family: var(--font-mono); color: var(--text-dim); margin-top: 1px; }
.subject-status { font-size: 9px; font-family: var(--font-mono); font-weight: 700; padding: 2px 6px; border-radius: 999px; text-transform: uppercase; }
.subject-status.nominal { background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); }
.subject-status.attention { background: rgba(245, 158, 11, 0.15); color: var(--accent-amber); }

.subject-meter { height: 5px; background: rgba(255, 255, 255, 0.08); border-radius: 3px; overflow: hidden; margin-bottom: 10px; }
.subject-meter-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan)); }

.subject-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; text-align: center; }
.subject-stat-unit { background: rgba(0, 0, 0, 0.3); padding: 5px 3px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.04); }
.subject-stat-lbl { font-size: 9px; color: var(--text-dim); font-family: var(--font-mono); text-transform: uppercase; }
.subject-stat-num { font-size: 12px; font-weight: 700; font-family: var(--font-mono); color: #fff; }

/* SPECTRUM HISTOGRAM */
.spectrum-box { background: rgba(0, 0, 0, 0.3); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 18px; }
.spectrum-bar { display: flex; height: 10px; border-radius: 5px; overflow: hidden; margin: 10px 0 12px; gap: 2px; }
.spectrum-seg { height: 100%; position: relative; }
.spectrum-seg.distinction { background: var(--accent-emerald); }
.spectrum-seg.merit { background: var(--accent-cyan); }
.spectrum-seg.pass { background: var(--accent-amber); }
.spectrum-seg.fail { background: var(--accent-rose); }
.spectrum-legend { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 11px; font-family: var(--font-mono); }
.legend-item { display: flex; align-items: center; gap: 5px; }
.legend-dot { width: 7px; height: 7px; border-radius: 50%; }
.legend-dot.distinction { background: var(--accent-emerald); }
.legend-dot.merit { background: var(--accent-cyan); }
.legend-dot.pass { background: var(--accent-amber); }
.legend-dot.fail { background: var(--accent-rose); }

/* FILTERS & SEARCH ROW */
.filter-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
  background: rgba(0, 0, 0, 0.25);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
}
.search-input {
  flex: 1;
  min-width: 200px;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 7px 10px;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 11px;
}
.search-input:focus { outline: none; border-color: var(--accent-cyan); box-shadow: 0 0 8px rgba(6, 182, 212, 0.3); }
.filter-select {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 7px 10px;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 11px;
}

/* DATA TABLES */
.table-wrapper { overflow-x: auto; border-radius: 8px; border: 1px solid var(--border-subtle); background: rgba(10, 16, 28, 0.6); }
table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 11px; }
th {
  background: rgba(16, 26, 44, 0.95);
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.05em;
  padding: 9px 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  white-space: nowrap;
}
td { padding: 9px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: var(--text-main); vertical-align: middle; }
tr:hover td { background: rgba(6, 182, 212, 0.04); }

/* BADGES & PILLS */
.name-pill { font-weight: 700; color: #fff; display: inline-flex; align-items: center; gap: 6px; }
.name-pill.anon { color: var(--text-dim); font-style: italic; }
.rep-badge {
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(244, 63, 94, 0.2);
  color: var(--accent-rose);
  border: 1px solid rgba(244, 63, 94, 0.4);
  font-weight: 800;
}
.mark-badge { display: inline-block; font-weight: 800; padding: 2px 7px; border-radius: 999px; font-size: 10px; }
.mark-distinction { background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); border: 1px solid var(--accent-emerald); }
.mark-pass { background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan); border: 1px solid var(--accent-cyan); }
.mark-marginal { background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); border: 1px solid var(--accent-amber); }
.mark-fail { background: rgba(244, 63, 94, 0.2); color: var(--accent-rose); border: 1px solid var(--accent-rose); }

.country-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.country-flag { font-size: 13px; }

/* RADAR GRID */
.radar-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.radar-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.radar-card.active-card { border-color: rgba(16, 185, 129, 0.5); box-shadow: 0 0 15px rgba(16, 185, 129, 0.15); }
.radar-card-info h4 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.radar-card-path { font-size: 10px; font-family: var(--font-mono); color: var(--text-dim); }
.radar-card-count { text-align: right; }
.radar-card-count .num { font-size: 22px; font-weight: 800; font-family: var(--font-mono); color: var(--accent-emerald); }
.radar-card-count .label { font-size: 8px; text-transform: uppercase; color: var(--text-dim); font-family: var(--font-mono); }

/* COUNTRY GRID */
.country-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 16px; }
.country-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.country-card .flag { font-size: 22px; }
.country-card .c-info { flex: 1; }
.country-card .c-name { font-size: 12px; font-weight: 700; color: #fff; }
.country-card .c-visitors { font-size: 10px; font-family: var(--font-mono); color: var(--text-dim); }

/* DETAILS & SECTIONS IN TABLES */
details.section-details summary, details.popular-details summary { cursor: pointer; color: var(--accent-cyan); font-weight: 600; outline: none; }
.section-visit-list { margin: 6px 0 0; padding-left: 14px; font-size: 10px; color: var(--text-muted); }
.section-visit-list li { margin: 2px 0; }

/* PAGINATION */
.pagination-bar { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); }
.page-controls { display: flex; gap: 6px; }

/* LOGIN SCREEN */
.login-wrapper { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
.login-box {
  width: 100%;
  max-width: 440px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 28px 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  text-align: center;
}
.login-box h2 { font-size: 18px; font-weight: 800; letter-spacing: 0.05em; color: #fff; margin-bottom: 4px; }
.login-sub { font-size: 10px; font-family: var(--font-mono); color: var(--text-dim); letter-spacing: 0.05em; margin-bottom: 20px; }
.login-field { text-align: left; margin-bottom: 14px; }
.login-field label { display: block; font-size: 10px; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 6px; }
.login-field input {
  width: 100%;
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 10px 12px;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 13px;
}
.login-field input:focus { outline: none; border-color: var(--accent-cyan); box-shadow: 0 0 10px rgba(6, 182, 212, 0.3); }
.login-status { margin-top: 12px; font-size: 12px; font-family: var(--font-mono); color: var(--accent-rose); min-height: 18px; }

@media (max-width: 768px) {
  body { padding: 10px 12px 40px; }
  .hud-header { flex-direction: column; align-items: stretch; gap: 12px; padding: 12px 14px; }
  .hud-clocks { justify-content: space-between; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .nav-tabs { gap: 4px; }
  .tab-btn { padding: 8px 12px; font-size: 10px; }
}
  `;

  const script = authorized ? `
    // LIVE CONTROL ROOM SCRIPT
    function countryInfo(code){
      if(!code||code==='XX')return {flag:'🌐',name:'Unknown'};
      if(code==='T1')return {flag:'🧅',name:'Tor Network'};
      if(!/^[A-Z]{2}$/.test(code))return {flag:'🌐',name:'Unknown'};
      const flag=String.fromCodePoint(...Array.from(code,c=>127397+c.charCodeAt(0)));
      try{return {flag,name:(new Intl.DisplayNames(['en'],{type:'region'}).of(code)||code)+' ('+code+')'};}catch{return {flag,name:code};}
    }

    function formatIST(val){
      const d=new Date(val);
      if(Number.isNaN(d.getTime()))return String(val||"Unknown");
      return d.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'medium'});
    }

    function updateClocks() {
      const now = new Date();
      const istStr = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST';
      const utcStr = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false }) + ' UTC';
      const istEl = document.getElementById('ist-clock');
      const utcEl = document.getElementById('utc-clock');
      if (istEl) istEl.textContent = istStr;
      if (utcEl) utcEl.textContent = utcStr;
    }
    setInterval(updateClocks, 1000);
    updateClocks();

    // STATE
    let allResults = [];
    let trafficRecords = [];
    let popularPageRecords = [];
    let liveData = { active: 0, pages: [] };
    let repeatedIPTotal = 0;
    let resultsPage = 1;
    let trafficPage = 1;
    let activeSubjectFilter = "";
    const SUBJECT_GROUPS = ["Sociology", "Philosophy of Education", "Indian Economy", "AI & Mind", "Ethics", "English", "Malayalam"];

    function subjectGroup(value){
      const name = String(value || "").toLowerCase();
      if (/sociology/.test(name)) return "Sociology";
      if (/education/.test(name)) return "Philosophy of Education";
      if (/economy|economic|foundation/.test(name)) return "Indian Economy";
      if (/artificial intelligence|(?:^|[^a-z0-9])ai(?:[^a-z0-9]|$)|mind|philosophy of mind/.test(name)) return "AI & Mind";
      if (/ethic/.test(name)) return "Ethics";
      if (/english/.test(name)) return "English";
      if (/malayalam/.test(name)) return "Malayalam";
      return "Other";
    }

    function isPassed(r){ const s = String(r.status||""); return /pass/i.test(s) && !/fail|below pass|needs improvement/i.test(s); }
    function isFailed(r){ return !isPassed(r); }
    function isDistinction(r){ return Number(r.percentage) >= 80; }

    // RENDER ATTEMPTS & 7-SUBJECT MATRIX
    function renderResults() {
      const search = (document.getElementById('result-search-input').value || "").trim().toLowerCase();
      const subjectFilter = document.getElementById('subject-filter').value || activeSubjectFilter;
      const gradeFilter = document.getElementById('grade-filter').value;
      const identityFilter = document.getElementById('identity-filter').value;
      const size = Math.max(1, Number(document.getElementById('page-size').value) || 50);

      // Filter attempts
      let filtered = allResults.filter(item => {
        if (subjectFilter && subjectGroup(item.subject) !== subjectFilter) return false;
        if (gradeFilter === 'distinction' && !isDistinction(item)) return false;
        if (gradeFilter === 'pass' && !isPassed(item)) return false;
        if (gradeFilter === 'fail' && !isFailed(item)) return false;
        const rawName = String(item.name || "").trim();
        const isAnon = !rawName || rawName.toLowerCase() === 'anonymous' || rawName.toLowerCase() === 'student';
        if (identityFilter === 'named' && isAnon) return false;
        if (identityFilter === 'anon' && !isAnon) return false;

        if (search) {
          const matchStr = (item.id + " " + item.name + " " + item.subject + " " + item.reg).toLowerCase();
          if (!matchStr.includes(search)) return false;
        }
        return true;
      });

      // Macro KPI
      const totalAttempts = allResults.length;
      const passedCount = allResults.filter(isPassed).length;
      const passRate = totalAttempts ? ((passedCount / totalAttempts) * 100).toFixed(1) : 0;
      const validScores = allResults.map(r => Number(r.percentage)).filter(Number.isFinite);
      const avgScore = validScores.length ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1) : 0;

      document.getElementById('test-total-attempts').textContent = String(totalAttempts);
      document.getElementById('test-pass-rate').textContent = passRate + '% PASS';
      document.getElementById('test-avg-score').textContent = avgScore + '% AVG';
      document.getElementById('badge-total-tests').textContent = String(totalAttempts);

      // Spectrum calculations
      const distCount = allResults.filter(isDistinction).length;
      const meritCount = allResults.filter(r => Number(r.percentage) >= 60 && Number(r.percentage) < 80).length;
      const passStandardCount = allResults.filter(r => Number(r.percentage) >= 40 && Number(r.percentage) < 60).length;
      const failCount = allResults.filter(r => Number(r.percentage) < 40).length;

      document.getElementById('spectrum-total').textContent = String(totalAttempts);
      document.getElementById('spectrum-pass-rate').textContent = passRate + '% Passed Standards (>=40%)';
      document.getElementById('count-distinction').textContent = String(distCount);
      document.getElementById('pct-distinction').textContent = totalAttempts ? ((distCount/totalAttempts)*100).toFixed(1)+'%' : '0%';
      document.getElementById('count-merit').textContent = String(meritCount);
      document.getElementById('pct-merit').textContent = totalAttempts ? ((meritCount/totalAttempts)*100).toFixed(1)+'%' : '0%';
      document.getElementById('count-pass').textContent = String(passStandardCount);
      document.getElementById('pct-pass').textContent = totalAttempts ? ((passStandardCount/totalAttempts)*100).toFixed(1)+'%' : '0%';
      document.getElementById('count-fail').textContent = String(failCount);
      document.getElementById('pct-fail').textContent = totalAttempts ? ((failCount/totalAttempts)*100).toFixed(1)+'%' : '0%';

      if (totalAttempts) {
        document.getElementById('seg-distinction').style.width = ((distCount/totalAttempts)*100) + '%';
        document.getElementById('seg-merit').style.width = ((meritCount/totalAttempts)*100) + '%';
        document.getElementById('seg-pass').style.width = ((passStandardCount/totalAttempts)*100) + '%';
        document.getElementById('seg-fail').style.width = ((failCount/totalAttempts)*100) + '%';
      }

      // Render 7 Subject Cards
      const grid = document.getElementById('subject-cards-grid');
      grid.replaceChildren();
      for (const subj of SUBJECT_GROUPS) {
        const items = allResults.filter(r => subjectGroup(r.subject) === subj);
        const subjPassed = items.filter(isPassed).length;
        const subjRate = items.length ? ((subjPassed / items.length) * 100).toFixed(1) : 0;
        const scores = items.map(r => Number(r.percentage)).filter(Number.isFinite);
        const subjAvg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) : 0;
        const topMark = scores.length ? Math.max(...scores).toFixed(1) : '—';
        const tests = new Set(items.map(r => r.subject || "Test"));

        const card = document.createElement('div');
        card.className = 'subject-box' + (subjectFilter === subj ? ' active-filter' : '');
        card.onclick = () => {
          if (activeSubjectFilter === subj) {
            activeSubjectFilter = "";
            document.getElementById('subject-filter').value = "";
          } else {
            activeSubjectFilter = subj;
            document.getElementById('subject-filter').value = subj;
          }
          resultsPage = 1;
          renderResults();
        };

        const head = document.createElement('div'); head.className = 'subject-box-head';
        const titleDiv = document.createElement('div');
        const sName = document.createElement('div'); sName.className = 'subject-name'; sName.textContent = subj;
        const sSub = document.createElement('div'); sSub.className = 'subject-tests-count'; sSub.textContent = (tests.size || 1) + " Tests Registered";
        titleDiv.append(sName, sSub);

        const badge = document.createElement('span');
        badge.className = 'subject-status ' + (Number(subjRate) >= 70 ? 'nominal' : 'attention');
        badge.textContent = subjRate + '% PASS';
        head.append(titleDiv, badge);

        const meter = document.createElement('div'); meter.className = 'subject-meter';
        const fill = document.createElement('div'); fill.className = 'subject-meter-fill'; fill.style.width = subjRate + '%';
        meter.append(fill);

        const sRow = document.createElement('div'); sRow.className = 'subject-stats-row';
        sRow.innerHTML = '<div class="subject-stat-unit"><div class="subject-stat-lbl">Attempts</div><div class="subject-stat-num">' + items.length + '</div></div>' +
          '<div class="subject-stat-unit"><div class="subject-stat-lbl">Average</div><div class="subject-stat-num">' + subjAvg + '%</div></div>' +
          '<div class="subject-stat-unit"><div class="subject-stat-lbl">Top Mark</div><div class="subject-stat-num">' + topMark + (topMark !== '—' ? '%' : '') + '</div></div>';

        card.append(head, meter, sRow);
        grid.append(card);
      }

      // Name repeat tracking
      const nameCounts = new Map();
      for (const r of allResults) {
        const k = String(r.name || "").trim().toLowerCase();
        if (k && k !== 'anonymous' && k !== 'student') {
          nameCounts.set(k, (nameCounts.get(k) || 0) + 1);
        }
      }

      // Pagination
      const totalPages = Math.max(1, Math.ceil(filtered.length / size));
      resultsPage = Math.min(Math.max(1, resultsPage), totalPages);
      const start = (resultsPage - 1) * size;
      const pageItems = filtered.slice(start, start + size);

      const tbody = document.getElementById('result-rows');
      tbody.replaceChildren();

      if (!pageItems.length) {
        const emptyTr = document.createElement('tr');
        emptyTr.innerHTML = '<td colspan="12" style="text-align:center; padding:32px; color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">' + (allResults.length ? 'NO MATCHING TEST ATTEMPTS FOUND FOR THIS FILTER' : 'NO TEST ATTEMPTS RECORDED IN DATABASE YET') + '</td>';
        tbody.append(emptyTr);
      }

      for (const item of pageItems) {
        const tr = document.createElement('tr');
        
        // ID
        const tdId = document.createElement('td'); tdId.textContent = '#' + item.id; tr.append(tdId);

        // Student Identity (Rectified display)
        const tdName = document.createElement('td');
        const rawName = String(item.name || "").trim();
        const normName = rawName.toLowerCase();
        const isAnon = !rawName || normName === 'anonymous' || normName === 'student';
        
        const pill = document.createElement('span');
        if (isAnon) {
          pill.className = 'name-pill anon';
          pill.innerHTML = 'Anonymous Student <span style="font-size:9px; background:rgba(255,255,255,0.06); padding:1px 4px; border-radius:3px;">[Legacy #' + item.id + ']</span>';
        } else {
          pill.className = 'name-pill';
          pill.textContent = rawName;
          const count = nameCounts.get(normName) || 1;
          if (count > 1) {
            const badge = document.createElement('span');
            badge.className = 'rep-badge';
            badge.textContent = '×' + count;
            badge.title = count + ' attempts by this student';
            pill.append(badge);
          }
        }
        tdName.append(pill);
        tr.append(tdName);

        // Registration
        const tdReg = document.createElement('td'); tdReg.textContent = item.reg || 'N/A'; tr.append(tdReg);

        // Subject / Test Discipline
        const tdSub = document.createElement('td');
        tdSub.innerHTML = '<strong style="color:#fff">' + (item.subject || 'Unspecified Test') + '</strong>';
        tr.append(tdSub);

        // Score
        const tdScore = document.createElement('td');
        tdScore.innerHTML = '<strong>' + (item.score != null ? item.score : '—') + ' / ' + (item.total != null ? item.total : '—') + '</strong>';
        tr.append(tdScore);

        // Mark %
        const tdPct = document.createElement('td');
        const pctVal = Number(item.percentage);
        const markBadge = document.createElement('span');
        if (Number.isFinite(pctVal)) {
          markBadge.className = 'mark-badge ' + (pctVal >= 80 ? 'mark-distinction' : pctVal >= 60 ? 'mark-pass' : pctVal >= 40 ? 'mark-marginal' : 'mark-fail');
          markBadge.textContent = pctVal.toFixed(1) + '%';
        } else {
          markBadge.textContent = '—';
        }
        tdPct.append(markBadge);
        tr.append(tdPct);

        // Performance Status
        const tdStatus = document.createElement('td');
        const st = String(item.status || "Unknown").toUpperCase();
        const pass = isPassed(item);
        tdStatus.innerHTML = '<span style="font-weight:700; color:' + (pass ? 'var(--accent-emerald)' : 'var(--accent-rose)') + '">' + st + '</span>';
        tr.append(tdStatus);

        // Wrong
        const tdWrong = document.createElement('td'); tdWrong.textContent = item.wrong != null ? String(item.wrong) : '—'; tr.append(tdWrong);

        // Skipped
        const tdSkip = document.createElement('td'); tdSkip.textContent = item.unanswered != null ? String(item.unanswered) : '—'; tr.append(tdSkip);

        // Device attempt (Same IP count)
        const tdIp = document.createElement('td');
        const ipAtt = Number(item.same_ip_attempts);
        if (Number.isFinite(ipAtt) && ipAtt > 1) {
          tdIp.innerHTML = '<span class="rep-badge">' + ipAtt + ' on IP</span>';
        } else {
          tdIp.textContent = Number.isFinite(ipAtt) ? ipAtt + ' on IP' : '—';
        }
        tr.append(tdIp);

        // Submission Mode
        const tdMode = document.createElement('td');
        if (item.auto_submitted) {
          tdMode.innerHTML = '<span style="color:var(--accent-amber)">⌛ Auto-Timeout</span>';
        } else {
          tdMode.innerHTML = '<span style="color:var(--accent-cyan)">⏱ Manual</span>';
        }
        tr.append(tdMode);

        // Timestamp (IST)
        const tdTime = document.createElement('td'); tdTime.textContent = formatIST(item.submitted_at); tr.append(tdTime);

        tbody.append(tr);
      }

      const first = filtered.length ? start + 1 : 0;
      const last = Math.min(start + pageItems.length, filtered.length);
      document.getElementById('page-info').textContent = "Showing " + first + "–" + last + " of " + filtered.length + " attempts · Page " + resultsPage + " of " + totalPages;
      document.getElementById('prev-page').disabled = resultsPage <= 1;
      document.getElementById('next-page').disabled = resultsPage >= totalPages;
      document.getElementById('results-status').textContent = allResults.length ? "Auditing " + filtered.length + " matching student attempts in database." : "No mock test attempts recorded yet.";
    }

    // RENDER TRAFFIC & GEO
    function renderTraffic() {
      const search = (document.getElementById('traffic-search-input').value || "").trim().toLowerCase();
      const size = Math.max(1, Number(document.getElementById('traffic-page-size').value) || 25);

      let filtered = trafficRecords.filter(v => {
        if (!search) return true;
        const str = (v.ip + " " + v.city + " " + v.region + " " + v.country + " " + v.path).toLowerCase();
        return str.includes(search);
      });

      // Country summary
      const countryCounts = new Map();
      for (const v of trafficRecords) {
        const c = v.country || 'XX';
        countryCounts.set(c, (countryCounts.get(c) || 0) + (v.visits || 1));
      }
      const cGrid = document.getElementById('country-summary-grid');
      cGrid.replaceChildren();
      const sortedCountries = Array.from(countryCounts.entries()).sort((a,b)=>b[1]-a[1]).slice(0, 8);
      const totalVis = trafficRecords.reduce((a,b)=>a+(b.visits||1),0);

      for (const [code, count] of sortedCountries) {
        const info = countryInfo(code);
        const card = document.createElement('div'); card.className = 'country-card';
        const pct = totalVis ? ((count / totalVis) * 100).toFixed(1) : 0;
        card.innerHTML = '<div class="flag">' + info.flag + '</div>' +
          '<div class="c-info">' +
            '<div class="c-name">' + info.name + '</div>' +
            '<div class="c-visitors">' + count + ' visits · ' + pct + '%</div>' +
          '</div>';
        cGrid.append(card);
      }

      const totalPages = Math.max(1, Math.ceil(filtered.length / size));
      trafficPage = Math.min(Math.max(1, trafficPage), totalPages);
      const start = (trafficPage - 1) * size;
      const pageItems = filtered.slice(start, start + size);

      const rows = document.getElementById('rows');
      rows.replaceChildren();

      if (!pageItems.length) {
        const emptyTr = document.createElement('tr');
        emptyTr.innerHTML = '<td colspan="7" style="text-align:center; padding:32px; color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">' + (trafficRecords.length ? 'NO MATCHING IP RECORDS FOUND' : 'NO INGRESS IP TELEMETRY LOGGED IN 7-DAY BUFFER') + '</td>';
        rows.append(emptyTr);
      }

      for (const v of pageItems) {
        const tr = document.createElement('tr');
        
        // Time
        const tdTime = document.createElement('td'); tdTime.textContent = formatIST(v.time); tr.append(tdTime);

        // IP
        const tdIp = document.createElement('td');
        tdIp.innerHTML = '<strong style="color:var(--accent-cyan)">' + v.ip + '</strong>';
        tr.append(tdIp);

        // Visits
        const tdVisits = document.createElement('td');
        tdVisits.innerHTML = '<span class="mark-badge ' + (v.visits > 10 ? 'mark-distinction' : v.visits > 3 ? 'mark-pass' : 'mark-marginal') + '">' + v.visits + ' visit' + (v.visits === 1 ? '' : 's') + '</span>';
        tr.append(tdVisits);

        // Country
        const tdC = document.createElement('td');
        const info = countryInfo(v.country);
        tdC.innerHTML = '<span class="country-pill"><span class="country-flag">' + info.flag + '</span> ' + info.name + '</span>';
        tr.append(tdC);

        // State / City
        const tdLoc = document.createElement('td');
        tdLoc.textContent = [v.region, v.city].filter(Boolean).join(', ') || 'Unknown';
        tr.append(tdLoc);

        // Current Page
        const tdPage = document.createElement('td'); tdPage.textContent = v.path || '/'; tr.append(tdPage);

        // Section Trail
        const tdTrail = document.createElement('td');
        const sections = Array.isArray(v.sections) ? v.sections : [];
        if (sections.length) {
          const details = document.createElement('details'); details.className = 'section-details';
          const summary = document.createElement('summary'); summary.textContent = 'Visited ' + sections.length + ' sections'; details.append(summary);
          const ul = document.createElement('ul'); ul.className = 'section-visit-list';
          for (const s of sections) {
            const li = document.createElement('li');
            li.textContent = s.name + ' — ' + s.visits + ' visit' + (s.visits === 1 ? '' : 's') + ' (Last: ' + formatIST(s.lastVisit) + ')';
            ul.append(li);
          }
          details.append(ul);
          tdTrail.append(details);
        } else {
          tdTrail.textContent = 'No trail';
        }
        tr.append(tdTrail);

        rows.append(tr);
      }

      const first = filtered.length ? start + 1 : 0;
      const last = Math.min(start + pageItems.length, filtered.length);
      document.getElementById('traffic-page-info').textContent = "Showing " + first + "–" + last + " of " + filtered.length + " IPs · Page " + trafficPage + " of " + totalPages;
      document.getElementById('traffic-prev-page').disabled = trafficPage <= 1;
      document.getElementById('traffic-next-page').disabled = trafficPage >= totalPages;
      document.getElementById('badge-total-ips').textContent = trafficRecords.length + ' IPs';
    }

    // RENDER POPULAR PAGES
    function renderPopularPages() {
      const tbody = document.getElementById('popular-page-rows');
      tbody.replaceChildren();
      const visitorsByIP = new Map(trafficRecords.map(v => [v.ip, v]));

      if (!popularPageRecords.length) {
        const emptyTr = document.createElement('tr');
        emptyTr.innerHTML = '<td colspan="7" style="text-align:center; padding:32px; color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">NO CONTENT PAGE VIEWS RECORDED YET</td>';
        tbody.append(emptyTr);
      }

      for (const [idx, p] of popularPageRecords.entries()) {
        const tr = document.createElement('tr');
        const tdRank = document.createElement('td'); tdRank.textContent = '#' + (idx + 1); tr.append(tdRank);

        const tdPage = document.createElement('td');
        tdPage.innerHTML = '<strong style="color:#fff">' + (p.section || 'Learning Page') + '</strong><br><small style="color:var(--text-dim)">' + (p.path || '/') + '</small>';
        tr.append(tdPage);

        const tdVisits = document.createElement('td'); tdVisits.textContent = String(p.visits); tr.append(tdVisits);
        const visitorsCount = Array.isArray(p.visitors) ? p.visitors.length : 0;
        const tdVisitors = document.createElement('td'); tdVisitors.textContent = String(visitorsCount); tr.append(tdVisitors);

        const tdRatio = document.createElement('td');
        tdRatio.textContent = visitorsCount ? (p.visits / visitorsCount).toFixed(2) : '—';
        tr.append(tdRatio);

        const tdLast = document.createElement('td'); tdLast.textContent = formatIST(p.lastVisit); tr.append(tdLast);

        const tdDetails = document.createElement('td');
        const details = document.createElement('details'); details.className = 'popular-details';
        const summary = document.createElement('summary'); summary.textContent = 'Inspect ' + visitorsCount + ' IPs'; details.append(summary);
        
        const ul = document.createElement('ul'); ul.className = 'section-visit-list';
        for (const visitor of (p.visitors || [])) {
          const li = document.createElement('li');
          const geo = visitorsByIP.get(visitor.ip);
          const flag = countryInfo(geo?.country).flag;
          const loc = [geo?.city, geo?.region].filter(Boolean).join(', ');
          li.textContent = flag + ' ' + visitor.ip + ' — ' + visitor.visits + ' visit' + (visitor.visits===1?'':'s') + ' · ' + formatIST(visitor.lastVisit) + (loc ? ' (' + loc + ')' : '');
          ul.append(li);
        }
        details.append(ul);
        tdDetails.append(details);
        tr.append(tdDetails);

        tbody.append(tr);
      }
      document.getElementById('badge-total-pages').textContent = String(popularPageRecords.length);
    }

    // RENDER LIVE RADAR
    function renderLiveRadar() {
      const count = Number(liveData.active) || 0;
      document.getElementById('live-active-count').textContent = String(count);
      document.getElementById('badge-live-tabs').textContent = count + ' ACTIVE';
      document.getElementById('radar-summary-text').textContent = '● ' + count + ' ACTIVE TABS IN 90s';

      const pages = Array.isArray(liveData.pages) ? liveData.pages : [];
      document.getElementById('live-pages-summary').textContent = count ? (pages.length + ' active study page' + (pages.length === 1 ? '' : 's')) : 'no active sessions';

      const grid = document.getElementById('live-pages-grid');
      grid.replaceChildren();

      if (!pages.length) {
        grid.innerHTML = '<p style="color:var(--text-dim); font-family:var(--font-mono); padding:16px;">No concurrent visitors detected on learning pages in the last 90 seconds.</p>';
        return;
      }

      for (const p of pages) {
        const card = document.createElement('div');
        card.className = 'radar-card active-card';
        card.innerHTML = '<div class="radar-card-info">' +
            '<h4>' + (p.section || 'Academic Hub Portal') + '</h4>' +
            '<div class="radar-card-path">' + (p.path || '/') + '</div>' +
          '</div>' +
          '<div class="radar-card-count">' +
            '<div class="num">' + p.count + '</div>' +
            '<div class="label">ACTIVE TABS</div>' +
          '</div>';
        grid.append(card);
      }
    }

    // DATA FETCHING
    async function refreshLiveVisitors() {
      try {
        const res = await fetch('/api/admin/live-visitors', { cache: 'no-store', credentials: 'same-origin' });
        if (res.status === 401) { location.href = '/admin/login'; return; }
        const d = await res.json();
        if (res.ok) {
          liveData = d;
        } else {
          liveData = { active: 0, pages: [] };
        }
      } catch (err) {
        console.warn('Live visitors fetch error:', err);
        liveData = { active: 0, pages: [] };
      } finally {
        renderLiveRadar();
      }
    }

    async function refreshTraffic() {
      try {
        const res = await fetch('/api/admin/traffic', { cache: 'no-store', credentials: 'same-origin' });
        if (res.status === 401) { location.href = '/admin/login'; return; }
        const d = await res.json();
        if (res.ok) {
          trafficRecords = Array.isArray(d.records) ? d.records : [];
          popularPageRecords = Array.isArray(d.popularPages) ? d.popularPages : [];
          
          if (d.today) {
            document.getElementById('today-badge').textContent = d.today.day || 'TODAY';
            document.getElementById('today-visitors').textContent = String(d.today.visitors || 0);
            document.getElementById('today-views').textContent = String(d.today.views || 0);
            document.getElementById('today-ratio').textContent = d.today.visitors ? (d.today.views / d.today.visitors).toFixed(2) : '0';
          }

          document.getElementById('buffer-views').textContent = String(d.views || trafficRecords.length);
          document.getElementById('buffer-ips').textContent = String(d.uniqueIPs || trafficRecords.length);
          
          const repeatIps = trafficRecords.filter(v => v.visits > 1).length;
          const repPct = trafficRecords.length ? ((repeatIps / trafficRecords.length) * 100).toFixed(1) : 0;
          document.getElementById('buffer-repeats').textContent = repPct + '%';
        }
      } catch (err) {
        console.warn('Traffic fetch error:', err);
      } finally {
        renderTraffic();
        renderPopularPages();
      }
    }

    async function refreshResults() {
      const btn = document.getElementById('refresh-results');
      if (btn) btn.disabled = true;
      try {
        const res = await fetch('/api/admin/results', { cache: 'no-store', credentials: 'same-origin' });
        if (res.status === 401) { location.href = '/admin/login'; return; }
        const d = await res.json();
        if (res.ok) {
          allResults = Array.isArray(d.results) ? d.results : [];
          repeatedIPTotal = Number(d.repeated_ip_total) || 0;
          
          // Populate subject filter dropdown if empty
          const sel = document.getElementById('subject-filter');
          if (sel && sel.options.length <= 1) {
            for (const s of SUBJECT_GROUPS) {
              sel.add(new Option(s, s));
            }
          }
          document.getElementById('results-status').textContent = allResults.length ? ('Auditing ' + allResults.length + ' student attempts in database.') : 'No mock test attempts recorded yet.';
        } else {
          document.getElementById('results-status').textContent = d.error || ('Mock test service returned HTTP ' + res.status);
          allResults = [];
        }
      } catch (err) {
        console.warn('Results fetch error:', err);
        document.getElementById('results-status').textContent = 'Network error fetching test telemetry.';
        allResults = [];
      } finally {
        if (btn) btn.disabled = false;
        renderResults();
      }
    }

    // COMMUNITY CHAT MODERATION
    async function loadAdminChat() {
      const status = document.getElementById('admin-chat-status');
      if (status) status.textContent = 'Loading community chat messages...';
      try {
        const res = await fetch('/api/chat', { cache: 'no-store', credentials: 'same-origin' });
        const d = await res.json();
        const messages = Array.isArray(d.messages) ? d.messages : [];
        const tbody = document.getElementById('admin-chat-rows');
        tbody.replaceChildren();

        if (!messages.length) {
          const emptyTr = document.createElement('tr');
          emptyTr.innerHTML = '<td colspan="4" style="text-align:center; padding:32px; color:var(--text-dim); font-family:var(--font-mono); font-size:13px;">NO COMMUNITY CHAT MESSAGES STORED</td>';
          tbody.append(emptyTr);
        }

        for (const msg of messages) {
          const tr = document.createElement('tr');
          const tdTime = document.createElement('td'); tdTime.textContent = formatIST(msg.createdAt); tr.append(tdTime);
          const tdName = document.createElement('td'); tdName.innerHTML = '<strong style="color:var(--accent-cyan)">' + (msg.name || 'Student') + '</strong>'; tr.append(tdName);
          const tdText = document.createElement('td'); tdText.textContent = msg.text || ''; tr.append(tdText);
          
          const tdAction = document.createElement('td');
          const delBtn = document.createElement('button');
          delBtn.className = 'btn btn-danger';
          delBtn.style.padding = '4px 8px';
          delBtn.textContent = 'DELETE';
          delBtn.onclick = async () => {
            if (!confirm('Delete message from student ' + (msg.name || '') + '?')) return;
            delBtn.disabled = true;
            try {
              const dr = await fetch('/api/chat/delete', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: msg.id })
              });
              const data = await dr.json().catch(() => ({}));
              if (dr.ok) {
                await loadAdminChat();
              } else {
                alert('Could not delete message: ' + (data.error || ('HTTP ' + dr.status)));
              }
            } catch (err) {
              alert('Network error while deleting message.');
            } finally {
              delBtn.disabled = false;
            }
          };
          tdAction.append(delBtn);
          tr.append(tdAction);

          tbody.append(tr);
        }
        if (status) status.textContent = messages.length ? 'Viewing ' + messages.length + ' active student messages.' : 'No chat messages stored.';
      } catch (err) {
        if (status) status.textContent = 'Could not load community chat messages.';
      }
    }

    // CSV EXPORTERS
    function exportResultsCSV() {
      if (!allResults.length) { alert('No test attempts to export.'); return; }
      const headers = ['ID', 'Student Name', 'Registration', 'Subject', 'Score', 'Total', 'Percentage', 'Status', 'Wrong', 'Unanswered', 'Auto Submitted', 'Submitted Time (IST)'];
      const rows = allResults.map(r => [
        r.id,
        '"' + (r.name || 'Anonymous').replace(/"/g, '""') + '"',
        '"' + (r.reg || 'N/A').replace(/"/g, '""') + '"',
        '"' + (r.subject || '').replace(/"/g, '""') + '"',
        r.score,
        r.total,
        r.percentage != null ? r.percentage + '%' : '',
        '"' + (r.status || '') + '"',
        r.wrong,
        r.unanswered,
        r.auto_submitted ? 'Yes' : 'No',
        '"' + formatIST(r.submitted_at) + '"'
      ]);
      const csv = [headers.join(','), ...rows.map(row => row.join(','))].join(String.fromCharCode(10));
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Academic_Hub_Mock_Test_Results_' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function exportTrafficCSV() {
      if (!trafficRecords.length) { alert('No traffic records to export.'); return; }
      const headers = ['Visitor IP', 'Total Visits', 'Country', 'Region', 'City', 'Last Active (IST)', 'Latest Page Path'];
      const rows = trafficRecords.map(v => [
        v.ip,
        v.visits,
        '"' + (v.country || 'XX') + '"',
        '"' + (v.region || '').replace(/"/g, '""') + '"',
        '"' + (v.city || '').replace(/"/g, '""') + '"',
        '"' + formatIST(v.time) + '"',
        '"' + (v.path || '/').replace(/"/g, '""') + '"'
      ]);
      const csv = [headers.join(','), ...rows.map(row => row.join(','))].join(String.fromCharCode(10));
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Academic_Hub_Traffic_Audit_' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    // TABS LOGIC
    const stations = [
      { id: 'assessment', tab: 'tab-btn-assessment', panel: 'panel-assessment' },
      { id: 'radar', tab: 'tab-btn-radar', panel: 'panel-radar' },
      { id: 'geo', tab: 'tab-btn-geo', panel: 'panel-geo' },
      { id: 'content', tab: 'tab-btn-content', panel: 'panel-content' },
      { id: 'chat', tab: 'tab-btn-chat', panel: 'panel-chat' }
    ];

    function activateStation(id) {
      for (const s of stations) {
        const isMatch = s.id === id;
        const btn = document.getElementById(s.tab);
        const pnl = document.getElementById(s.panel);
        if (btn) {
          btn.classList.toggle('active', isMatch);
          btn.setAttribute('aria-selected', String(isMatch));
        }
        if (pnl) pnl.hidden = !isMatch;
      }
      if (id === 'chat') loadAdminChat();
    }

    for (const s of stations) {
      const btn = document.getElementById(s.tab);
      if (btn) btn.onclick = () => activateStation(s.id);
    }

    // EVENTS & INITIAL LOAD
    document.getElementById('btn-force-sync').onclick = () => {
      refreshLiveVisitors();
      refreshTraffic();
      refreshResults();
    };

    document.getElementById('btn-export-results').onclick = exportResultsCSV;
    document.getElementById('btn-export-traffic').onclick = exportTrafficCSV;
    document.getElementById('refresh-results').onclick = refreshResults;

    document.getElementById('result-search-input').oninput = () => { resultsPage = 1; renderResults(); };
    document.getElementById('subject-filter').onchange = (e) => { activeSubjectFilter = e.target.value; resultsPage = 1; renderResults(); };
    document.getElementById('grade-filter').onchange = () => { resultsPage = 1; renderResults(); };
    document.getElementById('identity-filter').onchange = () => { resultsPage = 1; renderResults(); };
    document.getElementById('page-size').onchange = () => { resultsPage = 1; renderResults(); };
    document.getElementById('prev-page').onclick = () => { resultsPage = Math.max(1, resultsPage - 1); renderResults(); };
    document.getElementById('next-page').onclick = () => { resultsPage++; renderResults(); };

    document.getElementById('traffic-search-input').oninput = () => { trafficPage = 1; renderTraffic(); };
    document.getElementById('traffic-page-size').onchange = () => { trafficPage = 1; renderTraffic(); };
    document.getElementById('traffic-prev-page').onclick = () => { trafficPage = Math.max(1, trafficPage - 1); renderTraffic(); };
    document.getElementById('traffic-next-page').onclick = () => { trafficPage++; renderTraffic(); };

    document.getElementById('admin-chat-refresh').onclick = loadAdminChat;
    document.getElementById('admin-chat-clear').onclick = async () => {
      if (!confirm('DANGER: Clear all community student chat messages permanently?')) return;
      try {
        const res = await fetch('/api/chat/clear', {
          method: 'POST',
          credentials: 'same-origin'
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          await loadAdminChat();
        } else {
          alert('Could not clear messages: ' + (data.error || ('HTTP ' + res.status)));
        }
      } catch {
        alert('Network error.');
      }
    };

    document.getElementById('logout').onclick = async () => {
      try {
        await fetch('/api/admin/logout', { method: 'POST' });
      } finally {
        location.href = '/admin/login';
      }
    };

    // POLLING CYCLE
    let pollIntervalId = null;
    function setPollingInterval(ms) {
      if (pollIntervalId) clearInterval(pollIntervalId);
      if (ms > 0) {
        pollIntervalId = setInterval(() => {
          if (!document.hidden) {
            refreshLiveVisitors();
            refreshTraffic();
            refreshResults();
          }
        }, ms);
      }
    }

    document.getElementById('sync-interval').onchange = (e) => {
      setPollingInterval(Number(e.target.value));
    };

    // INITIAL TRIGGER
    refreshLiveVisitors();
    refreshTraffic();
    refreshResults();
    setPollingInterval(15000);
  ` : `
    const form = document.getElementById('login');
    const status = document.getElementById('status');
    form.onsubmit = async (e) => {
      e.preventDefault();
      status.textContent = 'AUTHENTICATING...';
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        const data = await res.json();
        if (res.ok) {
          status.style.color = 'var(--accent-emerald)';
          status.textContent = 'AUTHENTICATED. ENTERING CONTROL ROOM...';
          const params = new URLSearchParams(location.search);
          location.href = params.get('next') || '/admin/traffic';
        } else {
          status.style.color = 'var(--accent-rose)';
          status.textContent = data.error || 'ACCESS DENIED: Invalid Security Key';
        }
      } catch (err) {
        status.style.color = 'var(--accent-rose)';
        status.textContent = 'COMMUNICATION ERROR';
      }
    };
  `;

  return new Response(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Academic Hub // Control Room Watch</title>
<style>${styles}</style>
</head>
<body>
${content}
<script>${script}</script>
</body>
</html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self' https:; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
      "Referrer-Policy": "no-referrer"
    }
  });
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
    const sessionReq = new Request("https://internal/admin/api/admin/session", {
      method: "GET",
      headers: {
        "Cookie": request.headers.get("Cookie") || ""
      }
    });
    const session = await room.fetch(await adminRequest(sessionReq, env, "https://internal/admin/api/admin/session"));
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

