
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/stats")) {
      // Forward query params unchanged to target
      const target = new URL(env.TARGET_URL);
      target.search = url.search;

      const res = await fetch(target.toString(), {
        method: "GET",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": env.USER_AGENT || "Mozilla/5.0 (compatible; APE-AFF/1.0)",
          "Cookie": env.PP_COOKIE, // your auth
        },
      });

      // Pass-through response
      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: {
          "content-type": res.headers.get("content-type") || "application/json",
          // CORS open for your Netlify site
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "*",
        },
      });
    }

    // Health check
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
      });
    }

    return new Response("OK", { status: 200 });
  }
};
