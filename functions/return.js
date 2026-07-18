export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return Response.json(
      { error: "query parameter?" },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(
      `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`
    );

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") ||
          "application/json; charset=utf-8",
        "cache-control": "public, max-age=60",
      },
    });
  } catch {
    return Response.json(
      { error: "request failed" },
      { status: 502 }
    );
  }
}
