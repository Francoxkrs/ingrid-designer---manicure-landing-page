// Dados públicos da Ingridi. Tudo aqui vai para o site, então nada de dado pessoal sensível.
export const WHATSAPP = "5567993015257";
export const INSTAGRAM = "https://www.instagram.com/ingrididesigner/";

export function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export type Estilo = "nude" | "cor" | "arte" | "brilho";

export const estilos: { id: Estilo; nome: string }[] = [
  { id: "nude", nome: "Nudes e leitosas" },
  { id: "cor", nome: "Com cor" },
  { id: "arte", nome: "Francesinha e arte" },
  { id: "brilho", nome: "Com brilho" },
];

export interface Trabalho {
  id: string;
  nome: string;
  alt: string;
  estilos: Estilo[];
  /** Largura e altura do arquivo de 1200px (todas as fotos são 3:4) */
  w: number;
  h: number;
}

// Fotos reais do perfil dela, cada uma usada uma única vez no portfólio.
export const trabalhos: Trabalho[] = [
  {
    id: "unha-verde-agua-arte",
    nome: "Verde-água com folhas",
    alt: "Unhas amendoadas em verde-água brilhante, com uma unha nude decorada com folhas pretas e laranja",
    estilos: ["cor", "arte"],
    w: 1200, h: 1600,
  },
  {
    id: "unha-nude-amendoada",
    nome: "Nude rosado longo",
    alt: "Unhas longas amendoadas em nude rosado, com brilho de gel",
    estilos: ["nude"],
    w: 1200, h: 1600,
  },
  {
    id: "unha-chocolate-terracota",
    nome: "Chocolate, terracota e glitter",
    alt: "Unhas amendoadas alternando chocolate, terracota, marrom e uma unha com glitter dourado",
    estilos: ["cor", "brilho"],
    w: 1200, h: 1600,
  },
  {
    id: "unha-branco-leitoso",
    nome: "Branco leitoso",
    alt: "Unhas curtas arredondadas em branco leitoso, com acabamento brilhante",
    estilos: ["nude"],
    w: 1200, h: 1600,
  },
  {
    id: "unha-vermelha-coracao",
    nome: "Vermelho com coração",
    alt: "Unhas vermelhas, uma com glitter vermelho e uma com francesinha em V e um pequeno coração",
    estilos: ["cor", "arte", "brilho"],
    w: 1200, h: 1600,
  },
  {
    id: "unha-francesinha-rosa",
    nome: "Francesinha rosa com brilho",
    alt: "Unhas amendoadas em nude cintilante com pontas de francesinha rosa",
    estilos: ["nude", "arte", "brilho"],
    w: 1200, h: 1600,
  },
];

export interface Servico {
  id: string;
  nome: string;
  oque: string;
  praQuem: string;
  pergunta: string;
}

export const servicos: Servico[] = [
  {
    id: "fibra",
    nome: "Alongamento em fibra de vidro",
    oque: "Fios de fibra de vidro moldados sob o gel criam o comprimento que você quiser, com a lâmina fina e leve de uma unha natural.",
    praQuem: "Para quem quer unhas longas com cara de naturais, ou tem unha curta e quebradiça.",
    pergunta: "Oi, Ingridi! Quero saber sobre o alongamento em fibra de vidro. Tem horário?",
  },
  {
    id: "polygel",
    nome: "Alongamento em polygel",
    oque: "Uma massa entre o acrílico e o gel que é moldada e curada na cabine. Fica firme e mantém o formato.",
    praQuem: "Para quem usa muito as mãos e quer um alongamento mais resistente.",
    pergunta: "Oi, Ingridi! Quero saber sobre o alongamento em polygel. Tem horário?",
  },
  {
    id: "banho",
    nome: "Banho em gel",
    oque: "Uma camada de gel sobre a sua própria unha, sem alongar. Ela fica mais forte enquanto cresce.",
    praQuem: "Para quem quer deixar a unha crescer sem que ela quebre no caminho.",
    pergunta: "Oi, Ingridi! Quero saber sobre o banho em gel. Tem horário?",
  },
  {
    id: "esmaltacao",
    nome: "Esmaltação em gel",
    oque: "Esmalte em gel curado na cabine: sai seco, com brilho, e não descasca como o esmalte comum.",
    praQuem: "Para quem gosta da unha do jeito que é e quer a cor durando mais.",
    pergunta: "Oi, Ingridi! Quero saber sobre a esmaltação em gel. Tem horário?",
  },
  {
    id: "pe-mao",
    nome: "Pé e mão simples",
    oque: "Cutilagem caprichada e esmaltação tradicional, nas mãos e nos pés.",
    praQuem: "Para o cuidado de sempre, feito com a mesma atenção.",
    pergunta: "Oi, Ingridi! Quero agendar pé e mão. Tem horário?",
  },
];
