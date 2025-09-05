"use client";

import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { SipBusiness } from "@/lib/types";

export default function SipComboChart({ data }: { data: SipBusiness }) {
  return (
    <div className="chart-card">
      <h3 className="mb-4 text-lg font-semibold">SIP Business (Bar + Line)</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sipAmount" name="SIP Amount (₹L)" />
            <Line type="monotone" dataKey="sipCount" name="SIP Count" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
