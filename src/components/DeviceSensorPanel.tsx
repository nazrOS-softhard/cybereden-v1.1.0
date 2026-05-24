import { useEffect, useState } from "react";
import type { Sensor, Slider as SliderDef } from "@/lib/mockData";

interface Props {
  sensors: Sensor[];
  sliders: SliderDef[];
}

export function DeviceSensorPanel({ sensors: initial, sliders: initialSliders }: Props) {
  const [sensors, setSensors] = useState(initial);
  const [sliders, setSliders] = useState(initialSliders);

  // live wiggle on sensors
  useEffect(() => {
    const t = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => {
          const range = (s.max - s.min) * 0.04;
          const next = s.value + (Math.random() - 0.5) * range;
          return { ...s, value: Math.max(s.min, Math.min(s.max, next)) };
        }),
      );
    }, 900);
    return () => clearInterval(t);
  }, []);

  const totalLoad =
    sliders.reduce((acc, s) => acc + ((s.value - s.min) / (s.max - s.min)) * 100, 0) /
    sliders.length;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
          Live · Sensors
        </div>
        {sensors.map((s) => {
          const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
          return (
            <div key={s.label} className="border border-border bg-surface/40 p-3">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-muted-foreground uppercase tracking-wider">{s.label}</span>
                <span className="neon-text-cyan">
                  {s.value.toFixed(s.unit === "ГГц" ? 2 : 0)} {s.unit}
                </span>
              </div>
              <div className="h-1 bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background:
                      "linear-gradient(to right, var(--neon-cyan), var(--neon-violet))",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Controls · Interactive
          </span>
          <span className="font-mono text-[10px] neon-text-acid">
            LOAD {totalLoad.toFixed(0)}%
          </span>
        </div>
        {sliders.map((sl, i) => (
          <div key={sl.label} className="border border-border bg-surface/40 p-3">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-muted-foreground uppercase tracking-wider">{sl.label}</span>
              <span className="neon-text-acid">
                {sl.value.toFixed(sl.unit === "ГГц" ? 2 : 0)} {sl.unit}
              </span>
            </div>
            <input
              type="range"
              min={sl.min}
              max={sl.max}
              step={(sl.max - sl.min) / 100}
              value={sl.value}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setSliders((prev) => prev.map((p, idx) => (idx === i ? { ...p, value: v } : p)));
              }}
              className="w-full accent-[var(--neon-violet)] cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
