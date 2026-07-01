import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Retro CRT PC with text typing out on its blue screen — a "glow-arc-weaver"
 * style terminal effect. Typing runs client-side only (after mount) so there's
 * no hydration mismatch; the screen starts blank and types on load.
 *
 * The text box is positioned over the monitor's screen region of retro-pc.png
 * via percentages (tuned to the asset).
 */
export function CrtTerminal({ className = "" }: { className?: string }) {
  const { t, lang } = useT();
  const [text, setText] = useState("");
  const tRef = useRef(t);
  tRef.current = t;

  useEffect(() => {
    const lines = [
      tRef.current("crt.l1"),
      tRef.current("crt.l2"),
      tRef.current("crt.l3"),
      tRef.current("crt.l4"),
      tRef.current("crt.l5"),
      tRef.current("crt.l6"),
    ];
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let li = 0;
    let ci = 0;
    let acc = "";

    const schedule = (ms: number) => {
      timer = setTimeout(tick, ms);
    };
    const tick = () => {
      if (cancelled) return;
      if (li >= lines.length) {
        schedule(2800);
        // restart from blank
        timer = setTimeout(() => {
          if (cancelled) return;
          acc = "";
          li = 0;
          ci = 0;
          setText("");
          schedule(400);
        }, 2800);
        return;
      }
      const line = lines[li];
      if (ci <= line.length) {
        setText(acc + line.slice(0, ci));
        ci += 1;
        schedule(36);
      } else {
        acc += line + "\n";
        li += 1;
        ci = 0;
        schedule(340);
      }
    };
    schedule(500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lang]);

  return (
    <div className={cn("relative select-none", className)} aria-hidden>
      <img
        src="/img/retro-pc.webp"
        alt=""
        className="w-full drop-shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
        decoding="async"
      />
      {/* screen region of retro-pc.png (tuned to the asset) */}
      <div
        className="absolute overflow-hidden rounded-[3px]"
        style={{ left: "37.5%", top: "26%", width: "31.5%", height: "27%" }}
      >
        <pre className="crt-text m-0 text-[0.5rem] leading-[1.3] sm:text-[0.58rem] md:text-[0.64rem]">
          {text}
          <span className="crt-cursor h-[0.9em] align-middle" />
        </pre>
        <div className="crt-scan absolute inset-0" />
      </div>
    </div>
  );
}
