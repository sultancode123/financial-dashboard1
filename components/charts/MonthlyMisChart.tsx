"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { MonthlyMis } from "@/lib/types";

export default function MonthlyMisChart({ data }: { data: MonthlyMis }) {
  return (
    <div className="chart-card">
      <h3 className="mb-4 text-lg font-semibold">Monthly MIS (Multi-line)</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="purchases" name="Purchases" />
            <Line type="monotone" dataKey="redemptions" name="Redemptions" />
            <Line type="monotone" dataKey="aum" name="AUM (₹ cr)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
