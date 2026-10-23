// Geometria da mão do "Monte a sua": quatro dedos vistos de cima, unhas desenhadas por formato.
// É usada no build (SVG inicial já no HTML) e no navegador (troca só os atributos).

export interface Dedo {
  cx: number;
  w: number;
  /** Ponta do dedo (y) */
  topo: number;
  /** Rotação em graus em torno da base da mão */
  giro: number;
}

export const BASE_Y = 400;

export const dedos: Dedo[] = [
  { cx: 78, w: 64, topo: 128, giro: -9 },
  { cx: 168, w: 68, topo: 92, giro: -3 },
  { cx: 256, w: 64, topo: 112, giro: 4 },
  { cx: 336, w: 54, topo: 168, giro: 11 },
];

export interface Unha {
  l: number;
  r: number;
  cx: number;
  /** Linha da cutícula */
  yb: number;
  /** Borda livre (ponta da unha) */
  yt: number;
  len: number;
  nw: number;
}

export function medidas(d: Dedo, longa: boolean): Unha {
  const nw = d.w * 0.72;
  const yb = d.topo + d.w * 1.15;
  const len = d.w * 0.95 + (longa ? d.w * 0.95 : d.w * 0.2);
  return { l: d.cx - nw / 2, r: d.cx + nw / 2, cx: d.cx, yb, yt: yb - len, len, nw };
}

const f = (n: number) => n.toFixed(1);

export function nailPath(u: Unha, formato: string): string {
  const { l, r, cx, yb, yt, len, nw } = u;
  const ys = yb - nw * 0.28;
  const base = `M${f(l)} ${f(ys)}Q${f(l)} ${f(yb)} ${f(cx)} ${f(yb)}Q${f(r)} ${f(yb)} ${f(r)} ${f(ys)}`;
  switch (formato) {
    case "redonda": {
      const yc = yt + nw / 2;
      return `${base}L${f(r)} ${f(yc)}A${f(nw / 2)} ${f(nw / 2)} 0 0 0 ${f(l)} ${f(yc)}Z`;
    }
    case "quadrada": {
      const k = 5;
      return `${base}L${f(r)} ${f(yt + k)}Q${f(r)} ${f(yt)} ${f(r - k)} ${f(yt)}L${f(l + k)} ${f(yt)}Q${f(l)} ${f(yt)} ${f(l)} ${f(yt + k)}Z`;
    }
    case "bailarina": {
      const tw = nw * 0.3;
      const yc = yt + len * 0.5;
      return `${base}L${f(r)} ${f(yc)}L${f(cx + tw)} ${f(yt + 3)}Q${f(cx + tw)} ${f(yt)} ${f(cx + tw - 3)} ${f(yt)}L${f(cx - tw + 3)} ${f(yt)}Q${f(cx - tw)} ${f(yt)} ${f(cx - tw)} ${f(yt + 3)}L${f(l)} ${f(yc)}Z`;
    }
    default: {
      // amendoada
      const yc = yt + len * 0.5;
      const k = (yc - yt) * 0.45;
      return `${base}L${f(r)} ${f(yc)}C${f(r)} ${f(yc - k)} ${f(cx + nw * 0.14)} ${f(yt)} ${f(cx)} ${f(yt)}C${f(cx - nw * 0.14)} ${f(yt)} ${f(l)} ${f(yc - k)} ${f(l)} ${f(yc)}Z`;
    }
  }
}

/** Ponta branca da francesinha, recortada pela própria unha */
export function tipPath(u: Unha): string {
  const { l, r, cx, yt, len, nw } = u;
  const y = yt + len * 0.32;
  return `M${f(l - 4)} ${f(yt - 4)}L${f(r + 4)} ${f(yt - 4)}L${f(r + 4)} ${f(y)}Q${f(cx)} ${f(y + nw * 0.42)} ${f(l - 4)} ${f(y)}Z`;
}

/** Reflexo do gel: um traço fino na lateral */
export function shinePath(u: Unha): string {
  const { r, yb, yt, len, nw } = u;
  const x = r - nw * 0.2;
  return `M${f(x)} ${f(yb - nw * 0.42)}L${f(x)} ${f(yt + len * 0.42)}`;
}
