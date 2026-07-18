export async function onRequestGet() {
  try {
    const response = await fetch(
      "https://byod.privatedns.org/js/script.js"
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") ||
          "application/javascript; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Script request failed", {
      status: 502,
    });
  }
}
