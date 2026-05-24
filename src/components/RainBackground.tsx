import { useMemo } from "react";

export function RainBackground() {
  const drops = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 0.6 + Math.random() * 1.4,
        delay: Math.random() * 4,
        height: 40 + Math.random() * 120,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 hud-grid opacity-40" />
      <div className="absolute inset-0">
        {drops.map((d) => (
          <span
            key={d.id}
            className="rain-drop"
            style={{
              left: `${d.left}%`,
              height: `${d.height}px`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.3 0.12 305 / 0.4), transparent 60%), radial-gradient(ellipse at 80% 100%, oklch(0.3 0.12 210 / 0.3), transparent 50%)",
        }}
      />
    </div>
  );
}
