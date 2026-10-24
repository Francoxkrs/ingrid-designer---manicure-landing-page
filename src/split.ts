import { qsa } from "./utils.js";

/** Quebra [data-chars] em letras (dentro de palavras, para não quebrar linha no meio)
 *  e [data-scrub] em palavras, para animar uma a uma. O texto original fica no aria-label. */
export function splitText(): void {
  qsa("[data-chars]").forEach((el) => {
    const text = el.textContent ?? "";
    el.setAttribute("aria-label", text.trim());
    el.textContent = "";
    let i = 0;
    text.trim().split(/\s+/).forEach((word, w, all) => {
      const wrap = document.createElement("span");
      wrap.className = "word";
      wrap.setAttribute("aria-hidden", "true");
      for (const ch of word) {
        const span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--i", String(i++));
        span.textContent = ch;
        wrap.append(span);
      }
      el.append(wrap);
      if (w < all.length - 1) el.append(" ");
    });
  });

  qsa("[data-scrub]").forEach((el) => {
    const words = (el.textContent ?? "").trim().split(/\s+/);
    el.setAttribute("aria-label", words.join(" "));
    el.textContent = "";
    words.forEach((word, i) => {
      const w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      w.textContent = word;
      el.append(w);
      if (i < words.length - 1) el.append(" ");
    });
  });
}
