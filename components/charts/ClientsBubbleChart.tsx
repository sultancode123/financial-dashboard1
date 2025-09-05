"use client";

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid } from "recharts";
import { ClientsBubble } from "@/lib/types";

export default function ClientsBubbleChart({ data }: { data: ClientsBubble }) {
  return (
    <div className="chart-card">
      <h3 className="mb-4 text-lg font-semibold">Clients (Bubble)</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="aum" name="AUM (₹ cr)" />
            <YAxis dataKey="clients" name="Clients" />
            <ZAxis dataKey="value" range={[60, 120]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
