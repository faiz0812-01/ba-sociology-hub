# Owner traffic dashboard

In Cloudflare → Workers & Pages → academic-hub → Settings → Variables and Secrets, add ADMIN_PASSWORD as a Secret with a unique password of at least 16 characters, then deploy the updated Worker. Never commit the password.

Visit /admin/login. After login, the hub displays a Traffic button visible only in authenticated responses. Sessions expire after 8 hours and password changes invalidate them. /admin/traffic and /api/admin/traffic require an authenticated session. Visitor IP addresses are not returned in public responses.

Records contain page pathname, timestamp and Cloudflare-provided IP address. They are limited to the latest 1,000 successful HTML page requests within 7 days; counts describe retained records, not lifetime visitors. Query strings and request bodies are not collected. Raw records expire and are cleaned daily. IPs can be shared or change. Visits through other hosts such as GitHub Pages are outside this Worker and are not counted.
