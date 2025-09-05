"use client";

type MainCardProps = {
  title: string;
  value: number;
  mom: number;
  onView?: () => void;
};

function num(n: number) {
  return Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);
}

export function MainCard({ title, value, mom, onView }: MainCardProps) {
  const isUp = mom >= 0;
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`badge ${isUp ? "badge-green" : "badge-red"}`}>
          {isUp ? "▲" : "▼"} {Math.abs(mom).toFixed(1)}% MoM
        </span>
      </div>
      <div className="text-3xl md:text-4xl font-bold">
        ₹ {num(value)}
      </div>
      <div>
        <button onClick={onView} className="btn btn-primary">View Report</button>
      </div>
    </div>
  );
}

export default function MainCards({
  aum,
  sip
}: {
  aum: { value: number; mom: number };
  sip: { value: number; mom: number };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <MainCard title="AUM" value={aum.value} mom={aum.mom} onView={() => {}}/>
      <MainCard title="SIP" value={sip.value} mom={sip.mom} onView={() => {}}/>
    </div>
  );
}
