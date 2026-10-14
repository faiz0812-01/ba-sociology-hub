# Owner traffic dashboard

In Cloudflare → Workers & Pages → academic-hub → Settings → Variables and Secrets, add ADMIN_PASSWORD as a Secret with a unique password of at least 16 characters, then deploy the updated Worker. Never commit the password.

Visit /admin/login. After login, the hub displays a Traffic button visible only in authenticated responses. Sessions expire after 8 hours and password changes invalidate them. /admin/traffic and /api/admin/traffic require an authenticated session. Visitor IP addresses are not returned in public responses.

Records contain page pathname, timestamp and Cloudflare-provided IP address. They are limited to the latest 1,000 successful HTML page requests within 7 days; counts describe retained records, not lifetime visitors. Query strings and request bodies are not collected. Raw records expire and are cleaned daily. IPs can be shared or change. Visits through other hosts such as GitHub Pages are outside this Worker and are not counted.

## Connect mock-test results

The private Traffic page also shows mock-test totals, per-subject summaries, filters, and up to the latest 2,000 attempts. To connect it, set the same strong random token as a Secret in both Workers: `ADMIN_TOKEN` on `ba-sociology-results`, and `RESULTS_API_TOKEN` on `academic-hub`. If you no longer know the existing `ADMIN_TOKEN`, replace it with a new value in both Workers. Do not send the token in chat or commit it to GitHub. In Cloudflare, open each Worker → Settings → Variables and Secrets, add or update the Secret, then deploy each Worker.

The Hub requests results server-to-server. The owner session is required for the results endpoint, and only attempt fields needed by the dashboard are returned; result IP addresses, user agents, and provider details are excluded. The separate assessment dashboard can still use the same token in its password field.
