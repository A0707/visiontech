"use client";

import { useState } from "react";
import { formatMAD, cn } from "@/lib/utils";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const THUMB_CLASS =
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-electric-500 [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer dark:[&::-webkit-slider-thumb]:border-night-900 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-electric-500 [&::-moz-range-thumb]:cursor-pointer dark:[&::-moz-range-thumb]:border-night-900";

export function PriceRangeFilter({ min, max, step = 500, value, onChange }: PriceRangeFilterProps) {
  const [active, setActive] = useState<"min" | "max">("max");
  const [minVal, maxVal] = value;

  const leftPct = ((minVal - min) / (max - min)) * 100;
  const rightPct = ((maxVal - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative h-4">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-slate-900/10 dark:bg-white/10" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-electric-500"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onMouseDown={() => setActive("min")}
          onTouchStart={() => setActive("min")}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), maxVal - step);
            onChange([next, maxVal]);
          }}
          className={cn(
            "absolute inset-0 h-4 w-full cursor-pointer appearance-none bg-transparent",
            active === "min" ? "z-20" : "z-10",
            THUMB_CLASS
          )}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onMouseDown={() => setActive("max")}
          onTouchStart={() => setActive("max")}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), minVal + step);
            onChange([minVal, next]);
          }}
          className={cn(
            "absolute inset-0 h-4 w-full cursor-pointer appearance-none bg-transparent",
            active === "max" ? "z-20" : "z-10",
            THUMB_CLASS
          )}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate">
        <span>{formatMAD(minVal)}</span>
        <span>{formatMAD(maxVal)}</span>
      </div>
    </div>
  );
}
