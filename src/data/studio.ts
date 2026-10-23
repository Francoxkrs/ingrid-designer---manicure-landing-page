// Opções do "Monte a sua": as cores saíram das fotos reais do portfólio.
export interface Opcao {
  id: string;
  nome: string;
}

export interface Cor extends Opcao {
  hex: string;
  /** Trabalho do portfólio onde a cor aparece */
  foto?: string;
}

export const tecnicas: (Opcao & { longa: boolean })[] = [
  { id: "fibra", nome: "Fibra de vidro", longa: true },
  { id: "polygel", nome: "Polygel", longa: true },
  { id: "banho", nome: "Banho em gel", longa: false },
  { id: "esmaltacao", nome: "Esmaltação em gel", longa: false },
];

export const formatos: Opcao[] = [
  { id: "amendoada", nome: "Amendoada" },
  { id: "bailarina", nome: "Bailarina" },
  { id: "quadrada", nome: "Quadrada" },
  { id: "redonda", nome: "Redonda" },
];

export const cores: Cor[] = [
  { id: "nude-rosado", nome: "Nude rosado", hex: "#C99C93", foto: "unha-nude-amendoada" },
  { id: "branco-leitoso", nome: "Branco leitoso", hex: "#EFE7E1", foto: "unha-branco-leitoso" },
  { id: "rosa-chiclete", nome: "Rosa chiclete", hex: "#EE8F98", foto: "unha-rosa-estrelas" },
  { id: "verde-agua", nome: "Verde-água", hex: "#45B2AC", foto: "unha-verde-agua-arte" },
  { id: "terracota", nome: "Terracota", hex: "#C2541F", foto: "unha-chocolate-terracota" },
  { id: "chocolate", nome: "Chocolate", hex: "#55261F", foto: "unha-chocolate-terracota" },
  { id: "vermelho", nome: "Vermelho", hex: "#C3121F", foto: "unha-vermelha-coracao" },
];

export const acabamentos: Opcao[] = [
  { id: "lisa", nome: "Lisa" },
  { id: "francesinha", nome: "Francesinha" },
  { id: "glitter", nome: "Glitter no anelar" },
];
