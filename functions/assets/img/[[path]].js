export async function onRequestGet({ params }) {
  const path = Array.isArray(params.path)
    ? params.path.join("/")
    : params.path || "";

  try {
    const response = await fetch(
      `https://dogeub-assets.pages.dev/img/${encodeURI(path)}`
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") ||
          "application/octet-stream",
        "cache-control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Asset request failed", {
      status: 502,
    });
  }
}
