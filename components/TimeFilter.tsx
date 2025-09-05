"use client";

import { RangeKey } from "@/lib/types";

const options: RangeKey[] = ["3d", "7d", "10d", "30d"];

export default function TimeFilter({
  value,
  onChange
}: {
  value: RangeKey;
  onChange: (v: RangeKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = opt === value;
        return (
          <button
            key={opt}
            className={`btn ${active ? "btn-primary" : "btn-ghost"}`}
            onClick={() => onChange(opt)}
          >
            {opt.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
