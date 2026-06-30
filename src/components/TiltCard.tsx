import { useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * Interactive 3D card. Tracks the cursor to tilt on X/Y with a soft spring and
 * sweeps a specular glare toward the pointer. Children may use `.depth-pop` to
 * float above the surface. Static (no transform/listeners) for reduced-motion
 * and touch — tilt only makes sense with a pointer.
 */
export function TiltCard({
  children,
  className = "",
  max = 12,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 170, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 170, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glareOpacity = useMotionValue(0);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55), color-mix(in oklab, var(--violet) 24%, transparent) 30%, transparent 55%)`;

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") glareOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ background: glareBg, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] mix-blend-soft-light transition-opacity duration-300"
        />
      )}
    </motion.div>
  );
}
