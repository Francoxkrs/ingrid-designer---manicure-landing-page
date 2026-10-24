import { clamp, finePointer, lerp, onFrame, qs, qsa, reducedMotion } from "./utils.js";

/** Entradas por seção. Sem JS (ou se algo falhar) tudo já está visível: a classe
 *  .js-reveal só é colocada quando este arquivo roda. */
export function initReveal(): void {
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js-reveal");

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  // Irmãos entram em cascata (título → texto → imagem)
  for (const el of qsa(".reveal, [data-chars]")) {
    const irmaos = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [];
    const i = irmaos.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
    io.observe(el);
  }
}

/** A frase da Ingridi "acende" palavra por palavra conforme a rolagem.
 *  Só muda opacidade, então roda também com "reduzir movimento". */
export function initScrub(): void {
  const el = qs("[data-scrub]");
  if (!el) return;
  const words = qsa(".w", el);
  let ultimo = -1;
  onFrame(() => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const ini = innerHeight * 0.85;
    const fim = innerHeight * 0.3;
    const p = clamp((ini - r.top) / (ini - fim + r.height * 0.5));
    const acesas = Math.round(p * words.length);
    if (acesas === ultimo) return;
    ultimo = acesas;
    words.forEach((w, i) => w.classList.toggle("is-lit", i < acesas));
  });
}

/** Parallax no scroll ([data-parallax]) e no mouse dentro do hero ([data-depth]).
 *  Desligado com "reduzir movimento": é o efeito que mais dá enjoo. */
export function initParallax(): void {
  if (reducedMotion()) return;
  const itens = qsa("[data-parallax]");
  const hero = qs("[data-hero]");
  const floats = qsa("[data-depth]");
  let mx = 0;
  let my = 0;
  let cx = 0;
  let cy = 0;

  if (hero && finePointer()) {
    hero.addEventListener("pointermove", (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    });
    hero.addEventListener("pointerleave", () => {
      mx = 0;
      my = 0;
    });
  }

  onFrame(() => {
    if (scrollY < innerHeight * 1.6) {
      for (const el of itens) {
        const v = parseFloat(el.dataset.parallax ?? "0");
        el.style.transform = `translate3d(0, ${scrollY * v}px, 0)`;
      }
    }
    cx = lerp(cx, mx, 0.07);
    cy = lerp(cy, my, 0.07);
    for (const el of floats) {
      const d = parseFloat(el.dataset.depth ?? "0");
      el.style.translate = `${cx * d * 2}px ${cy * d * 2 - scrollY * d * 0.012}px`;
    }
  });
}

/** Botões que "puxam" o cursor de leve. */
export function initMagnetic(): void {
  if (!finePointer()) return;
  for (const el of qsa("[data-magnetic]")) {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${x * 0.22}px ${y * 0.32}px`;
    });
    el.addEventListener("pointerleave", () => (el.style.translate = ""));
  }
}

/** Duplica a faixa para o loop não ter emenda. Os clones ficam escondidos do leitor de tela. */
export function initMarquee(): void {
  for (const track of qsa("[data-marquee]")) {
    for (const child of Array.from(track.children)) {
      const c = child.cloneNode(true) as HTMLElement;
      c.setAttribute("aria-hidden", "true");
      track.append(c);
    }
  }
}

/** Galeria de trabalhos: no desktop a rolagem vertical vira horizontal enquanto a seção
 *  fica presa na tela. Com "reduzir movimento" ou no celular vira faixa com rolagem lateral. */
export function initGaleria(): void {
  const secao = qs("[data-hscroll]");
  const trilho = qs("[data-trilho]");
  const barra = qs("[data-progresso]");
  const desk = matchMedia("(min-width: 64em)");
  if (!secao || !trilho || reducedMotion()) return;

  let distancia = 0;
  let atual = 0;
  const medir = (): void => {
    if (!desk.matches) {
      secao.style.height = "";
      trilho.style.transform = "";
      distancia = 0;
      return;
    }
    distancia = Math.max(0, trilho.scrollWidth - trilho.clientWidth);
    secao.style.height = `${distancia + innerHeight}px`;
  };
  document.documentElement.classList.add("has-hscroll");
  medir();
  addEventListener("resize", medir);
  addEventListener("load", medir);
  // O filtro muda a largura do trilho
  addEventListener("galeria:medir", medir);

  onFrame(() => {
    if (!distancia) return;
    const r = secao.getBoundingClientRect();
    const total = secao.offsetHeight - innerHeight;
    const p = total > 0 ? clamp(-r.top / total) : 0;
    atual = lerp(atual, p, 0.12);
    trilho.style.transform = `translate3d(${-atual * distancia}px, 0, 0)`;
    if (barra) barra.style.transform = `scaleX(${atual})`;
  });
}

/** Etiqueta "quero essa" que segue o mouse sobre as fotos dos trabalhos. */
export function initCursorFoto(): void {
  const tag = qs("[data-cursor]");
  if (!tag || !finePointer()) return;
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let ativo = false;
  for (const img of qsa(".obra__img, .hero__arco")) {
    img.addEventListener("pointerenter", () => {
      ativo = true;
      tag.classList.add("is-on");
    });
    img.addEventListener("pointerleave", () => {
      ativo = false;
      tag.classList.remove("is-on");
    });
  }
  addEventListener("pointermove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  }, { passive: true });
  onFrame(() => {
    if (!ativo && !tag.classList.contains("is-on")) return;
    x = lerp(x, tx, 0.2);
    y = lerp(y, ty, 0.2);
    tag.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

/** Ano do rodapé, sem depender de quando o build rodou. */
export function initAno(): void {
  document.querySelectorAll("[data-ano]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
}
