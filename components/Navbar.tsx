"use client";
import { useEffect, useState } from "react";
import { cn } from "@/components/utils";
import {
  BarChart3, Briefcase, CreditCard, Landmark, LineChart,
  Search, Shield, ShoppingCart, Target, FileText, Wrench, Menu
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const items = [
  { label: "CRM", href: "/crm", icon: Briefcase },
  { label: "Utilities", href: "/utilities", icon: Wrench },
  { label: "Insurance", href: "/insurance", icon: Shield },
  { label: "Assets", href: "/assets", icon: Landmark },
  { label: "Mutual", href: "/mutual", icon: ShoppingCart },
  { label: "Research", href: "/research", icon: Search },
  { label: "Transact Online", href: "/transact-online", icon: CreditCard },
  { label: "Goal GPS", href: "/goal-gps", icon: Target },
  { label: "Financial Planning", href: "/financial-planning", icon: LineChart },
  { label: "Wealth Report", href: "/wealth-report", icon: FileText },
  { label: "Other", href: "/other", icon: BarChart3 }
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10 bg-[var(--bg)]/80 backdrop-blur px-4 py-3">
        <div className="font-semibold text-lg">WealthPro</div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 dark:border-white/10 bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-lg">WealthPro</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {items.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} className="btn btn-ghost flex items-center gap-1">
              <Icon className="size-4" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden btn btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="size-5" />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)] border-t border-black/5 dark:border-white/10 px-4 py-3 space-y-2">
          {items.map(({ label, href }) => (
            <Link key={label} href={href} className="block text-sm py-1">
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
