// "Monte a sua": a cliente escolhe técnica, formato, cor e acabamento, vê a mão pintando
// e leva a escolha pronta para o WhatsApp.
import { waLink } from "./data/site.js";
import { acabamentos, cores, formatos, tecnicas } from "./data/studio.js";
import { dedos, medidas, nailPath, shinePath, tipPath } from "./nails.js";

const BRANCO = "#FBF7F3";

export function initStudio(): void {
  const form = document.querySelector<HTMLFormElement>("[data-studio]");
  const mao = document.querySelector<SVGSVGElement>("[data-mao]");
  if (!form || !mao) return;

  const titulo = mao.querySelector("[data-mao-titulo]");
  const resumo = document.querySelector<HTMLElement>("[data-studio-resumo]");
  const cta = document.querySelector<HTMLAnchorElement>("[data-studio-cta]");
  const corNome = form.querySelector<HTMLElement>("[data-cor-nome]");
  const verFoto = document.querySelector<HTMLAnchorElement>("[data-studio-foto]");
  const grupos = Array.from(mao.querySelectorAll<SVGGElement>(":scope > g"));
  let corAtual = "";

  const valor = (name: string) => (form.elements.namedItem(name) as RadioNodeList | null)?.value ?? "";
  const nome = <T extends { id: string; nome: string }>(lista: T[], id: string) => lista.find((o) => o.id === id);

  const atualizar = () => {
    const tecnica = nome(tecnicas, valor("tecnica")) ?? tecnicas[0];
    const formato = nome(formatos, valor("formato")) ?? formatos[0];
    const cor = nome(cores, valor("cor")) ?? cores[0];
    const acab = nome(acabamentos, valor("acabamento")) ?? acabamentos[0];

    grupos.forEach((g, i) => {
      const u = medidas(dedos[i], tecnica.longa);
      const d = nailPath(u, formato.id);
      g.querySelector("[data-clip]")?.setAttribute("d", d);
      const base = g.querySelector("[data-base]");
      base?.setAttribute("d", d);
      g.querySelector("[data-brilho]")?.setAttribute("d", shinePath(u));
      const ponta = g.querySelector<SVGPathElement>("[data-ponta]");
      if (ponta) {
        ponta.setAttribute("d", tipPath(u));
        ponta.setAttribute("fill", cor.id === "branco-leitoso" ? cores[0].hex : BRANCO);
        ponta.classList.toggle("is-on", acab.id === "francesinha");
      }
      g.querySelector("[data-glitter]")?.classList.toggle("is-on", acab.id === "glitter");

      const tinta = g.querySelector<SVGRectElement>("[data-tinta]");
      if (tinta && cor.hex === corAtual) {
        base?.setAttribute("fill", cor.hex);
        tinta.setAttribute("fill", cor.hex);
      } else if (tinta) {
        // A cor nova sobe da cutícula até a ponta, como o gel sendo aplicado
        base?.setAttribute("fill", corAtual || cor.hex);
        tinta.setAttribute("fill", cor.hex);
        tinta.classList.remove("is-pintando");
        tinta.getBoundingClientRect();
        tinta.style.animationDelay = `${i * 70}ms`;
        tinta.classList.add("is-pintando");
      }
    });
    corAtual = cor.hex;

    const extra = acab.id === "lisa" ? "" : `, ${acab.nome.toLowerCase()}`;
    const texto = `${tecnica.nome}, ${formato.nome.toLowerCase()}, ${cor.nome.toLowerCase()}${extra}`;
    if (titulo) titulo.textContent = `Prévia: ${texto}`;
    if (corNome) corNome.textContent = cor.nome;
    if (resumo) resumo.textContent = texto;
    if (cta) {
      cta.href = waLink(
        `Oi, Ingridi! Montei minha unha no seu site: ${texto}. Quanto fica e quando tem horário?`
      );
    }
    if (verFoto) {
      verFoto.hidden = !cor.foto;
      if (cor.foto) verFoto.href = `#${cor.foto}`;
    }
  };

  // A cor que veio no HTML já está pintada; só as trocas animam
  corAtual = (nome(cores, valor("cor")) ?? cores[0]).hex;
  form.addEventListener("change", atualizar);
  form.addEventListener("submit", (e) => e.preventDefault());
  atualizar();
}
