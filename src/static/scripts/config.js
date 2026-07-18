const backendOrigin = (
  import.meta.env.VITE_PROXY_ORIGIN || ""
).replace(/\/$/, "");

function toWebSocketOrigin(origin) {
  return origin
    .replace(/^https:/i, "wss:")
    .replace(/^http:/i, "ws:");
}

export const CONFIG = {
  bUrl: backendOrigin
    ? `${backendOrigin}/seal/`
    : "/seal/",

  ws: backendOrigin
    ? `${toWebSocketOrigin(backendOrigin)}/wisp/`
    : "/wisp/",

  unsupported: ["spotify.com"],
  filter: ["neal.fun"],
};
