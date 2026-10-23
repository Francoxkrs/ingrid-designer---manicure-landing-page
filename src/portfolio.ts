// Filtro do portfólio por estilo, com o estado na URL (?estilo=cor) para links diretos.
export function initPortfolio(): void {
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-estilo]"));
  const obras = Array.from(document.querySelectorAll<HTMLElement>("[data-estilos]"));
  const status = document.querySelector<HTMLElement>("[data-filtro-status]");
  if (!chips.length || !obras.length) return;

  const aplicar = (estilo: string, push: boolean) => {
    let n = 0;
    for (const o of obras) {
      const ok = !estilo || (o.dataset.estilos ?? "").split(" ").includes(estilo);
      o.hidden = !ok;
      if (ok) n++;
    }
    for (const c of chips) c.setAttribute("aria-pressed", String(c.dataset.estilo === estilo));
    if (status) status.textContent = `${n} ${n === 1 ? "trabalho" : "trabalhos"}`;
    if (push) {
      const url = new URL(location.href);
      if (estilo) url.searchParams.set("estilo", estilo);
      else url.searchParams.delete("estilo");
      history.replaceState(null, "", url);
    }
  };

  for (const c of chips) c.addEventListener("click", () => aplicar(c.dataset.estilo ?? "", true));

  const inicial = new URLSearchParams(location.search).get("estilo") ?? "";
  if (chips.some((c) => c.dataset.estilo === inicial)) aplicar(inicial, false);
}
