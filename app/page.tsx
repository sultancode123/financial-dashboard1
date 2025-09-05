"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import MainCards from "@/components/MainCards";
import TimeFilter from "@/components/TimeFilter";
import StatCard from "@/components/StatCard";
import Loader from "@/components/Loader";
import ClientsBubbleChart from "@/components/charts/ClientsBubbleChart";
import SipComboChart from "@/components/charts/SipComboChart";
import MonthlyMisChart from "@/components/charts/MonthlyMisChart";
import { getJSON } from "@/lib/fetcher";
import type {
  RangeKey,
  Metric,
  Stats,
  ClientsBubble,
  SipBusiness,
  MonthlyMis,
} from "@/lib/types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type MetricsResponse = {
  range: RangeKey;
  AUM: Metric;
  SIP: Metric;
};

export default function Page() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [loading, setLoading] = useState(true);

  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [clients, setClients] = useState<ClientsBubble>([]);
  const [sipBusiness, setSipBusiness] = useState<SipBusiness>([]);
  const [monthlyMis, setMonthlyMis] = useState<MonthlyMis>([]);

  const pdfRef = useRef<HTMLDivElement>(null);

  // ✅ Load data whenever range changes
  useEffect(() => {
    let isCancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [m, sAll, cAll, sipAll, misAll] = await Promise.all([
          getJSON<MetricsResponse>("/data/metrics.json"),
          getJSON<Record<RangeKey, Stats>>("/data/stats.json"),
          getJSON<Record<RangeKey, ClientsBubble>>("/data/clients.json"),
          getJSON<Record<RangeKey, SipBusiness>>("/data/sipBusiness.json"),
          getJSON<Record<RangeKey, MonthlyMis>>("/data/monthlyMis.json"),
        ]);
        if (isCancelled) return;

        setMetrics(m);
        setStats(sAll[range]);
        setClients(cAll[range]);
        setSipBusiness(sipAll[range]);
        setMonthlyMis(misAll[range]);
      } catch (e) {
        console.error(e);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();
    return () => {
      isCancelled = true;
    };
  }, [range]);

  // ✅ Memoized KPI values
  const aum = useMemo(
    () => ({ value: metrics?.AUM.value ?? 0, mom: metrics?.AUM.mom ?? 0 }),
    [metrics]
  );
  const sip = useMemo(
    () => ({ value: metrics?.SIP.value ?? 0, mom: metrics?.SIP.mom ?? 0 }),
    [metrics]
  );

  // ✅ PDF EXPORT FUNCTION
  async function downloadPDF() {
    if (!pdfRef.current) return;

    const el = pdfRef.current;
    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: getComputedStyle(document.body).backgroundColor,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Extra pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Wealth_Report.pdf");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 space-y-6">
        {/* Header Row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Financial Dashboard
          </h1>
          <div className="flex flex-wrap gap-2">
            <TimeFilter value={range} onChange={setRange} />
            <button onClick={downloadPDF} className="btn btn-primary">
              Download PDF
            </button>
          </div>
        </div>

        {/* Export Content */}
        <div ref={pdfRef} id="pdf-root" className="space-y-6">
          {/* KPI Cards */}
          {loading ? <Loader /> : <MainCards aum={aum} sip={sip} />}

          {/* Stat Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {loading ? (
              <>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
              </>
            ) : (
              <>
                <StatCard label="Purchases" value={stats?.purchases ?? "-"} />
                <StatCard label="Redemptions" value={stats?.redemptions ?? "-"} />
                <StatCard
                  label="Rejected Transactions"
                  value={stats?.rejectedTransactions ?? "-"}
                />
                <StatCard
                  label="SIP Rejections"
                  value={stats?.sipRejections ?? "-"}
                />
                <StatCard label="New SIP" value={stats?.newSIP ?? "-"} />
              </>
            )}
          </section>
{/* Charts */}
<section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {loading ? (
    <>
      <div className="chart-card">
        <Loader />
      </div>
      <div className="chart-card">
        <Loader />
      </div>
      <div className="chart-card lg:col-span-1">
        <Loader />
      </div>
    </>
  ) : (
    <>
      <div className="chart-card">
        <ClientsBubbleChart data={clients} />
      </div>
      <div className="chart-card">
        <SipComboChart data={sipBusiness} />
      </div>
      <div className="chart-card lg:col-span-3">
        <MonthlyMisChart data={monthlyMis} />
      </div>
    </>
  )}
</section>

        </div>
      </main>
    </div>
  );
}
