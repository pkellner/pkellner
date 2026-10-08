export const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const COLORS = ["red", "amber", "green", "blue"];

/** A burst of little diamonds in the four logo colors. */
export function burst(x: number, y: number, n = 16) {
  if (reduceMotion() || !document.body.animate) return;
  for (let i = 0; i < n; i++) {
    const el = document.createElement("i");
    el.className = "cf";
    el.style.left = `${x - 6}px`;
    el.style.top = `${y - 6}px`;
    el.style.background = `var(--${COLORS[i % 4]})`;
    document.body.appendChild(el);
    const a = Math.random() * Math.PI * 2;
    const d = 60 + Math.random() * 110;
    const anim = el.animate(
      [
        { transform: "translate(0,0) rotate(45deg) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 40}px) rotate(${200 + Math.random() * 300}deg) scale(0.2)`, opacity: 0 },
      ],
      { duration: 650 + Math.random() * 450, easing: "cubic-bezier(.2,.8,.3,1)" }
    );
    anim.onfinish = () => el.remove();
  }
}

/** Copies text, falling back to selecting `fallbackEl` so the visitor can press ⌘C. */
export async function copyText(text: string, fallbackEl?: Element | null): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (fallbackEl) {
      const r = document.createRange();
      r.selectNodeContents(fallbackEl);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(r);
    }
    return false;
  }
}
