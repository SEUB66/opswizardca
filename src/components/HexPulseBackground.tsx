import { useEffect, useRef } from "react";

/**
 * HexPulseBackground — a subtle hexagonal mesh with a roaming violet spotlight,
 * echoing the Wizard Ops banner (hex grid + light beam). Mounted once globally
 * in __root.tsx as a fixed, pointer-events-none layer behind all content.
 */
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.trim().replace("#", "");
  const n =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const v = parseInt(n, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function HexPulseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getW = () => window.visualViewport?.width ?? window.innerWidth;
    const getH = () => window.visualViewport?.height ?? window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = getW();
      const h = getH();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);

    const rootEl = document.documentElement;
    const isDark = () => rootEl.classList.contains("dark");

    const readColors = () => {
      const cs = getComputedStyle(rootEl);
      const baseHex =
        cs.getPropertyValue("--honeycomb-stroke").trim() || (isDark() ? "#3B414A" : "#C7CCD5");
      // Roaming highlight: on-brand violet, gentle so it never washes out text.
      const spotHex = isDark() ? "#A855F7" : "#9B5DE8";
      return { base: hexToRgb(baseHex), spot: hexToRgb(spotHex), dark: isDark() };
    };
    let { base, spot, dark } = readColors();

    const themeObserver = new MutationObserver(() => {
      ({ base, spot, dark } = readColors());
    });
    themeObserver.observe(rootEl, { attributes: true, attributeFilter: ["class"] });

    const isMobile = () => getW() < 768;
    const R = () => (isMobile() ? 18 : 28);
    const SIN60 = Math.sqrt(3) / 2;
    const SPOT_RADIUS = () => (isMobile() ? 220 : 360);

    const corners = (cx: number, cy: number, r: number) =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
      });

    const hexPath = (pts: [number, number][]) => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.closePath();
    };

    const FADE_IN = 2.0;
    const HOLD = 3.5;
    const FADE_OUT = 2.0;
    const CYCLE = FADE_IN + HOLD + FADE_OUT;
    const MARGIN = 0.15;

    let spotX = getW() * (MARGIN + Math.random() * (1 - 2 * MARGIN));
    let spotY = getH() * (MARGIN + Math.random() * (1 - 2 * MARGIN));
    let cycleStart = performance.now() / 1000;
    let rafId = 0;

    const pickNewPosition = () => {
      spotX = getW() * (MARGIN + Math.random() * (1 - 2 * MARGIN));
      spotY = getH() * (MARGIN + Math.random() * (1 - 2 * MARGIN));
    };

    const draw = () => {
      const now = performance.now() / 1000;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const r = R();
      const colW = r * 1.5;
      const rowH = r * SIN60 * 2;
      const spotR = SPOT_RADIUS();

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      let elapsed = now - cycleStart;
      if (elapsed >= CYCLE) {
        cycleStart = now;
        elapsed = 0;
        pickNewPosition();
      }

      let intensity: number;
      if (elapsed < FADE_IN) intensity = easeInOutCubic(elapsed / FADE_IN);
      else if (elapsed < FADE_IN + HOLD) {
        const holdT = (elapsed - FADE_IN) / HOLD;
        intensity = 0.85 + 0.15 * Math.sin(holdT * Math.PI * 2);
      } else intensity = easeInOutCubic(1 - (elapsed - FADE_IN - HOLD) / FADE_OUT);

      const baseAlphaFactor = dark ? 1.1 : 0.95;
      const lineWidthBase = dark ? 0.45 : 0.5;
      const [br, bg, bb] = base;
      const [sr, sg, sb] = spot;

      const cols = Math.ceil(W / colW) + 3;
      const rows = Math.ceil(H / rowH) + 3;

      for (let c = 0; c < cols; c++) {
        for (let row = 0; row < rows; row++) {
          const cx = Math.round(c * colW - r);
          const cy = Math.round(row * rowH + (c % 2 === 0 ? 0 : rowH / 2) - r);

          const dist = Math.hypot(cx - spotX, cy - spotY);
          const near = Math.max(0, 1 - dist / spotR);
          const spotAlpha = Math.pow(near, 2.0) * intensity;
          const baseAlpha = 0.085 * baseAlphaFactor;

          const pts = corners(cx, cy, r);

          hexPath(pts);
          ctx.strokeStyle = `rgba(${br},${bg},${bb},${baseAlpha + spotAlpha * 0.18})`;
          ctx.lineWidth = lineWidthBase + spotAlpha * 0.25;
          ctx.stroke();

          if (spotAlpha > 0.04) {
            hexPath(pts);
            ctx.fillStyle = `rgba(${sr},${sg},${sb},${spotAlpha * 0.09})`;
            ctx.fill();

            hexPath(pts);
            ctx.strokeStyle = `rgba(${sr},${sg},${sb},${spotAlpha * 0.42})`;
            ctx.lineWidth = 0.6 + spotAlpha * 0.5;
            ctx.stroke();

            const right = pts[0];
            const bottomRight = pts[1];
            const bottomLeft = pts[2];
            const extrude = spotAlpha * 7;

            ctx.beginPath();
            ctx.moveTo(right[0], right[1]);
            ctx.lineTo(bottomRight[0], bottomRight[1]);
            ctx.lineTo(bottomRight[0], bottomRight[1] + extrude);
            ctx.lineTo(right[0], right[1] + extrude);
            ctx.closePath();
            ctx.fillStyle = `rgba(${sr},${sg},${sb},${spotAlpha * 0.08})`;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(bottomRight[0], bottomRight[1]);
            ctx.lineTo(bottomLeft[0], bottomLeft[1]);
            ctx.lineTo(bottomLeft[0], bottomLeft[1] + extrude);
            ctx.lineTo(bottomRight[0], bottomRight[1] + extrude);
            ctx.closePath();
            ctx.fillStyle = `rgba(${sr},${sg},${sb},${spotAlpha * 0.05})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100vw", height: "100dvh" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
