import { finePointer, onFrame, qs } from "./utils.js";

interface Grao {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  tam: number;
  giro: number;
  ang: number;
  cor: string;
}

// Dourado do bordado do jaleco, rosa e creme
const CORES = ["#e3c48f", "#f6e3b4", "#d99b98", "#fff8ef", "#c9a26b"];
const MAX = 120;

/** O cursor solta glitter dourado por onde passa (só com mouse). */
export function initGlitter(): void {
  const canvas = qs<HTMLCanvasElement>("[data-glitter-canvas]");
  if (!canvas || !finePointer()) {
    canvas?.remove();
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const graos: Grao[] = [];
  let dpr = 1;
  let ux = 0;
  let uy = 0;

  const resize = (): void => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  };
  resize();
  addEventListener("resize", resize);

  addEventListener(
    "pointermove",
    (e) => {
      const dist = Math.hypot(e.clientX - ux, e.clientY - uy);
      ux = e.clientX;
      uy = e.clientY;
      const n = Math.min(3, Math.floor(dist / 16));
      for (let i = 0; i < n && graos.length < MAX; i++) {
        graos.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.7,
          vy: Math.random() * 0.5 + 0.25,
          vida: 1,
          tam: Math.random() * 4.5 + 2,
          giro: (Math.random() - 0.5) * 0.14,
          ang: Math.random() * Math.PI,
          cor: CORES[(Math.random() * CORES.length) | 0],
        });
      }
    },
    { passive: true }
  );

  // Estrelinha de quatro pontas, igual às da unha do hero
  const estrela = (s: number): void => {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(0, 0, s, 0);
    ctx.quadraticCurveTo(0, 0, 0, s);
    ctx.quadraticCurveTo(0, 0, -s, 0);
    ctx.quadraticCurveTo(0, 0, 0, -s);
    ctx.fill();
  };

  onFrame(() => {
    if (!graos.length) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = graos.length - 1; i >= 0; i--) {
      const g = graos[i];
      g.vida -= 0.02;
      if (g.vida <= 0) {
        graos.splice(i, 1);
        continue;
      }
      g.x += g.vx;
      g.y += g.vy;
      g.vy += 0.012;
      g.ang += g.giro;
      ctx.setTransform(dpr, 0, 0, dpr, g.x * dpr, g.y * dpr);
      ctx.rotate(g.ang);
      ctx.globalAlpha = g.vida;
      ctx.fillStyle = g.cor;
      estrela(g.tam * (0.4 + g.vida * 0.6));
    }
    ctx.globalAlpha = 1;
    if (!graos.length) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
}
