// Copia /public para /dist, compila o TypeScript para /dist/js e escreve no index.html
// o portfólio, os serviços e o "Monte a sua" (o site funciona e aparece no Google sem JS).
import { cpSync, readFileSync, rmSync, watch, writeFileSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const isWatch = process.argv.includes("--watch");

async function inject() {
  // Query string evita o cache de módulos do Node no modo watch
  const r = await import(pathToFileURL(resolve("dist/js/render.js")).href + `?t=${Date.now()}`);
  const logo = readFileSync("public/img/ingridi.svg", "utf8").replace("<svg ", `<svg class="logo" aria-hidden="true" focusable="false" `);
  const slots = {
    logo,
    filtros: r.filtros(),
    portfolio: r.portfolio(),
    servicos: r.listaServicos(),
    "studio-controles": r.studioControles(),
    "studio-svg": r.studioSvg(),
  };
  let html = readFileSync("public/index.html", "utf8");
  for (const [name, value] of Object.entries(slots)) {
    if (!html.includes(`<!--@${name}-->`)) throw new Error(`Faltou o marcador <!--@${name}--> no index.html`);
    html = html.replaceAll(`<!--@${name}-->`, value);
  }
  writeFileSync("dist/index.html", html);
}

rmSync("dist", { recursive: true, force: true });
cpSync("public", "dist", { recursive: true });

if (isWatch) {
  let timer;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cpSync("public", "dist", { recursive: true });
      inject().catch((e) => console.error(e.message));
    }, 150);
  };
  watch("public", { recursive: true }, rebuild);
  spawn("npx", ["tsc", "--watch", "--preserveWatchOutput"], { stdio: "inherit" });
  watch("dist/js", { recursive: true }, rebuild);
} else {
  const r = spawnSync("npx", ["tsc"], { stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
  await inject();
  // render.js só serve ao build
  rmSync("dist/js/render.js");
}
