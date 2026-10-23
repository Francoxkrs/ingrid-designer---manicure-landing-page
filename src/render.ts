// Usado só no build: escreve no index.html o portfólio, os serviços e o "Monte a sua",
// para o conteúdo aparecer sem JavaScript e ser lido pelo Google.
import { estilos, servicos, trabalhos, waLink } from "./data/site.js";
import { acabamentos, cores, formatos, tecnicas } from "./data/studio.js";
import { BASE_Y, dedos, medidas, nailPath, shinePath, tipPath } from "./nails.js";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ext = `target="_blank" rel="noopener noreferrer"`;

export function img(id: string, alt: string, sizes: string, lazy = true, w = 1200, h = 1600): string {
  const set = [480, 800, 1200].map((n) => `/img/${id}-${n}.webp ${n}w`).join(", ");
  const load = lazy ? `loading="lazy" decoding="async"` : `fetchpriority="high" decoding="async"`;
  return `<img src="/img/${id}-800.webp" srcset="${set}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${load}>`;
}

export function filtros(): string {
  const all = `<button type="button" class="chip" data-estilo="" aria-pressed="true">Todas <span class="chip__n">${trabalhos.length}</span></button>`;
  return (
    all +
    estilos
      .map((e) => {
        const n = trabalhos.filter((t) => t.estilos.includes(e.id)).length;
        return `<button type="button" class="chip" data-estilo="${e.id}" aria-pressed="false">${esc(e.nome)} <span class="chip__n">${n}</span></button>`;
      })
      .join("")
  );
}

export function portfolio(): string {
  return trabalhos
    .map((t, i) => {
      const msg = `Oi, Ingridi! Vi no seu site a unha “${t.nome}” e quero uma assim. Tem horário?`;
      return `<li class="obra obra--${i + 1}" id="${t.id}" data-estilos="${t.estilos.join(" ")}">
  <figure class="obra__fig reveal">
    <div class="obra__img">${img(t.id, t.alt, "(min-width: 64em) 30vw, (min-width: 40em) 45vw, 90vw")}</div>
    <figcaption class="obra__cap">
      <span class="obra__nome">${esc(t.nome)}</span>
      <a class="obra__cta" href="${esc(waLink(msg))}" ${ext} data-wa="portfolio">Quero uma assim</a>
    </figcaption>
  </figure>
</li>`;
    })
    .join("\n");
}

export function listaServicos(): string {
  return servicos
    .map(
      (s) => `<li class="servico reveal" id="servico-${s.id}">
  <h3 class="servico__nome">${esc(s.nome)}</h3>
  <p class="servico__oque">${esc(s.oque)}</p>
  <p class="servico__quem">${esc(s.praQuem)}</p>
  <a class="servico__cta" href="${esc(waLink(s.pergunta))}" ${ext} data-wa="servico">Perguntar sobre ${esc(s.nome.toLowerCase())}</a>
</li>`
    )
    .join("\n");
}

function radios(name: string, legend: string, ops: { id: string; nome: string }[], checked: string, cls = ""): string {
  const items = ops
    .map(
      (o) => `<label class="opt${cls}"><input type="radio" name="${name}" value="${o.id}"${o.id === checked ? " checked" : ""}><span>${esc(o.nome)}</span></label>`
    )
    .join("");
  return `<fieldset class="studio__grupo"><legend>${legend}</legend><div class="studio__ops">${items}</div></fieldset>`;
}

export function studioControles(): string {
  const swatches = cores
    .map(
      (c, i) =>
        `<label class="swatch"><input type="radio" name="cor" value="${c.id}"${i === 3 ? " checked" : ""}><svg class="swatch__dot" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="${c.hex}"/></svg><span class="swatch__nome">${esc(c.nome)}</span></label>`
    )
    .join("");
  return [
    radios("tecnica", "Técnica", tecnicas, "fibra"),
    radios("formato", "Formato", formatos, "amendoada"),
    `<fieldset class="studio__grupo"><legend>Cor <span class="studio__cor" data-cor-nome>Verde-água</span></legend><div class="studio__ops studio__ops--cores">${swatches}</div></fieldset>`,
    radios("acabamento", "Acabamento", acabamentos, "lisa"),
  ].join("\n");
}

export function studioSvg(): string {
  const cor = cores[3].hex;
  const fingers = dedos
    .map((d, i) => {
      const u = medidas(d, true);
      const p = nailPath(u, "amendoada");
      return `<g transform="rotate(${d.giro} ${d.cx} ${BASE_Y + 60})">
    <rect class="dedo" x="${d.cx - d.w / 2}" y="${d.topo}" width="${d.w}" height="${BASE_Y - d.topo + 80}" rx="${d.w / 2}"/>
    <clipPath id="unha-${i}"><path data-clip d="${p}"/></clipPath>
    <path class="unha" data-base d="${p}" fill="${cor}"/>
    <g clip-path="url(#unha-${i})">
      <rect class="tinta" data-tinta x="${d.cx - d.w}" y="0" width="${d.w * 2}" height="${BASE_Y}" fill="${cor}"/>
      <path class="ponta" data-ponta d="${tipPath(u)}"/>
      ${i === 2 ? `<rect class="glitter" data-glitter x="${d.cx - d.w}" y="0" width="${d.w * 2}" height="${BASE_Y}" fill="url(#glitter)"/>` : ""}
    </g>
    <path class="brilho" data-brilho d="${shinePath(u)}"/>
  </g>`;
    })
    .join("\n  ");
  return `<svg class="mao" viewBox="0 0 410 ${BASE_Y}" role="img" aria-labelledby="mao-titulo" data-mao>
  <title id="mao-titulo" data-mao-titulo>Prévia: fibra de vidro, amendoada, verde-água, lisa</title>
  <defs>
    <pattern id="glitter" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.3" fill="#F6E3B4"/><circle cx="6.5" cy="5" r="0.9" fill="#FFFFFF"/><circle cx="3.5" cy="7.5" r="1" fill="#E7C27D"/>
    </pattern>
  </defs>
  ${fingers}
</svg>`;
}
