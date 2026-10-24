// Entradas por seção. Sem JS (ou se algo falhar) tudo já está visível: a classe .js
// só é colocada quando este arquivo roda.
export function initReveal(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
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
  for (const el of els) {
    const irmaos = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [];
    const i = irmaos.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
    io.observe(el);
  }
}

/** Ano do rodapé, sem depender de quando o build rodou. */
export function initAno(): void {
  document.querySelectorAll("[data-ano]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
}
