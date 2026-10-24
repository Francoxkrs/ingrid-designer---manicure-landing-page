import { splitText } from "./split.js";
import { initGlitter } from "./glitter.js";
import { initNav } from "./nav.js";
import { initPortfolio } from "./portfolio.js";
import { initStudio } from "./studio.js";
import {
  initAno,
  initCursorFoto,
  initGaleria,
  initMagnetic,
  initMarquee,
  initParallax,
  initReveal,
  initScrub,
} from "./motion.js";

document.documentElement.classList.remove("no-js");

splitText();
initMarquee();
initNav();
initPortfolio();
initStudio();
initGaleria();
initScrub();
initParallax();
initMagnetic();
initCursorFoto();
initGlitter();
initAno();
initReveal();

// Hero entra assim que a página aparece, sem tela de espera
requestAnimationFrame(() => document.documentElement.classList.add("is-ready"));
