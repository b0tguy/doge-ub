import { cp, mkdir } from "node:fs/promises";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";

async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true });
  await cp(source, destination, {
    recursive: true,
    force: true,
  });
}

await copyDirectory(epoxyPath, "dist/epoxy");
await copyDirectory(baremuxPath, "dist/baremux");
await copyDirectory(bareModulePath, "dist/baremod");
await copyDirectory(uvPath, "dist/uv");

// Restore the repository's custom Ultraviolet configuration.
await cp("public/uv/uv.config.js", "dist/uv/uv.config.js", {
  force: true,
});

console.log("Copied proxy runtime assets into dist.");
