// Cabeçalho, menu do celular e botão fixo do WhatsApp.
export function initNav(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!header) return;

  addEventListener("scroll", () => header.classList.toggle("is-solid", scrollY > 24), { passive: true });

  const setMenu = (open: boolean) => {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-aberto", open);
    menu.classList.toggle("is-open", open);
    if (open) menu.querySelector<HTMLAnchorElement>("a")?.focus();
  };
  burger?.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      burger.focus();
    }
  });

  // O botão fixo aparece depois do hero e sai de cena perto do convite final
  const fab = document.querySelector<HTMLElement>("[data-fab]");
  const hero = document.querySelector("[data-hero]");
  const fim = document.querySelector("#agendar");
  if (!fab || !hero) return;
  let passou = false;
  let perto = false;
  const sync = () => fab.classList.toggle("is-on", passou && !perto);
  new IntersectionObserver(([e]) => {
    passou = !e.isIntersecting;
    sync();
  }).observe(hero);
  if (fim)
    new IntersectionObserver(([e]) => {
      perto = e.isIntersecting;
      sync();
    }).observe(fim);
}
