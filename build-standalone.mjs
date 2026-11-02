/* Builds a single self-contained HTML file (classic IIFE script, inline CSS).
   No network requests, no module scripts — safe inside sandboxed iframes. */
import { build } from "esbuild";
import fs from "node:fs";

await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  format: "iife",
  jsx: "automatic",
  minify: true,
  outdir: ".standalone-tmp",
  write: true,
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
});

import path from "node:path";
const files = fs.readdirSync(".standalone-tmp");
let js = fs.readFileSync(path.join(".standalone-tmp", files.find((f) => f.endsWith(".js"))), "utf8");
let css = fs.readFileSync(path.join(".standalone-tmp", files.find((f) => f.endsWith(".css"))), "utf8");
js = js.split("</script>").join("<\\/script>");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#0E7A54" />
    <meta name="description" content="ANN SETU (अन्न सेतु) — Connecting surplus food from restaurants, hotels and donors to NGOs and volunteers so it reaches people in need instead of being wasted." />
    <title>ANN SETU · अन्न सेतु — Connecting Surplus Food to Those Who Need It</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230E7A54'/%3E%3Cpath d='M9 21c0-6 5-11 11-11M9 11c6 0 11 5 11 11' stroke='white' stroke-width='2.2' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='9' cy='21' r='2.4' fill='white'/%3E%3Ccircle cx='20' cy='11' r='2.4' fill='%2386E0B0'/%3E%3C/svg%3E" />
    <style>__CSS__</style>
  </head>
  <body>
    <div id="root"></div>
    <script>__JS__</script>
  </body>
</html>
`;

const out = html.replace("__CSS__", () => css).replace("__JS__", () => js);
fs.writeFileSync("ann-setu-prototype.html", out);
fs.copyFileSync("ann-setu-prototype.html", "../ann-setu-prototype.html");
console.log(`standalone: ${(out.length / 1024).toFixed(0)} KB · css ${(css.length / 1024).toFixed(0)} KB · js ${(js.length / 1024).toFixed(0)} KB`);
