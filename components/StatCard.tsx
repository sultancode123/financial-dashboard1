"use client";

export default function StatCard({
  label,
  value
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="card">
      <div className="text-sm opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
