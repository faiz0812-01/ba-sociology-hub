// Cloudflare Worker for BA Sociology Assessment
// Deploy with a D1 database. Set ADMIN_TOKEN as a Worker secret.
// D1 binding name: DB
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

function json(data, status=200){
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type":"application/json", ...cors}
  });
}

export default {
  async fetch(request, env){
    if(request.method === "OPTIONS") return new Response("", {headers:cors});
    const url = new URL(request.url);

    if(url.pathname === "/submit" && request.method === "POST"){
      let body;
      try { body = await request.json(); } catch { return json({error:"Invalid JSON"},400); }

      const required=["name","reg","subject","score","total","percentage","wrong","unanswered","status","submittedAt"];
      for(const k of required) if(body[k]===undefined || body[k]===null || body[k]==="") return json({error:"Missing "+k},400);

      // Cloudflare provides the connecting IP in this header at the edge.
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const cfCountry = (request.cf?.country || request.headers.get("CF-IPCountry") || "Unknown").toUpperCase();
      const provider = request.cf?.asOrganization || request.cf?.asn || "Unknown";
      const ua = request.headers.get("User-Agent") || "";

      await env.DB.prepare(`ALTER TABLE results ADD COLUMN provider TEXT`).run().catch(() => {});

      await env.DB.prepare(
        `INSERT INTO results
        (name, reg, subject, score, total, percentage, wrong, unanswered, status, auto_submitted, submitted_at, ip_address, user_agent, country, provider)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        String(body.name).slice(0,120), String(body.reg).slice(0,80), String(body.subject).slice(0,80),
        Number(body.score), Number(body.total), Number(body.percentage), Number(body.wrong),
        Number(body.unanswered), String(body.status).slice(0,40), body.autoSubmitted ? 1 : 0,
        String(body.submittedAt), ip, ua.slice(0,500), cfCountry, String(provider).slice(0,160)
      ).run();

      return json({ok:true});
    }

    if(url.pathname === "/results" && request.method === "GET"){
      const auth = request.headers.get("Authorization") || "";
      const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
      if(!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) return json({error:"Unauthorized"},401);

      const limit = Math.min(Number(url.searchParams.get("limit") || 500), 2000);
      const result = await env.DB.prepare(
        `SELECT id,name,reg,subject,score,total,percentage,wrong,unanswered,status,auto_submitted,submitted_at,ip_address,country,provider
         FROM results ORDER BY id DESC LIMIT ?`
      ).bind(limit).all();
      return json({results:result.results || []});
    }

    return json({service:"BA Sociology Assessment API", ok:true});
  }
};