"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, ArrowRight, ShoppingCart, Zap, Target } from "lucide-react";

// ── Mini charts ────────────────────────────────────────────────────
const HERO_BARS = [30, 55, 40, 70, 50, 80, 60, 90, 65, 85, 45, 95];

const HERO_COLORS = [
  "var(--p-accent)",
  "var(--s-accent, var(--p-300))",
  "var(--t-accent, var(--p-200))",
];

function HeroBarChart() {
  return (
    <div className="flex items-end gap-1 h-16 mt-4">
      {HERO_BARS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            backgroundColor: HERO_COLORS[i % 3],
            minWidth: 3,
            opacity: i % 3 === 0 ? 1 : 0.65,
          }}
        />
      ))}
    </div>
  );
}

function SparkLine({ color }: { color: string }) {
  const pts = [45, 60, 40, 70, 55, 80, 65, 85];
  const w = 80, h = 24;
  const points = pts
    .map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / 100) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-2">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Mini donut ─────────────────────────────────────────────────────
function MiniDonut() {
  const r = 28, sw = 9, circ = 2 * Math.PI * r;
  const slices = [
    { pct: 45, color: "var(--p-accent)" },
    { pct: 32, color: "var(--s-accent, var(--p-300))" },
    { pct: 23, color: "var(--t-accent, var(--p-200))" },
  ];
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth={sw} />
        {slices.map((s, i) => {
          const dash = (s.pct / 100) * circ;
          const gap = circ - dash;
          const el = (
            <circle
              key={i}
              cx="36" cy="36" r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={sw}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="flex flex-col gap-1.5">
        {[
          { label: "Primary", pct: "45%", color: "var(--p-accent)" },
          { label: "Second", pct: "32%", color: "var(--s-accent, var(--p-300))" },
          { label: "Tertiary", pct: "23%", color: "var(--t-accent, var(--p-200))" },
        ].map(({ label, pct, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-[10px]">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-muted-foreground">{label}</span>
            <span className="font-semibold ml-auto pl-2">{pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Blog data ──────────────────────────────────────────────────────
const BLOG_POSTS = [
  { category: "Productivity", title: "Productivity Hacks for Remote Teams", read: "4 min" },
  { category: "Design",       title: "The Ultimate Digital Design Toolkit",   read: "6 min" },
  { category: "Teams",        title: "Design in Cross-Functional Teams",      read: "3 min" },
];

const BLOG_BG = [
  "linear-gradient(135deg, var(--p-300), var(--p-500))",
  "linear-gradient(135deg, var(--s-300, var(--p-300)), var(--s-500, var(--p-500)))",
  "linear-gradient(135deg, var(--t-300, var(--p-300)), var(--t-500, var(--p-500)))",
];

// ── Expense progress bars ──────────────────────────────────────────
const EXPENSES = [
  { label: "Groceries",     amount: "$4,875", pct: 65, color: "var(--p-accent)" },
  { label: "Restaurant",    amount: "$4,815", pct: 55, color: "var(--s-accent, var(--p-400))" },
  { label: "Uncategorized", amount: "$4,201", pct: 40, color: "var(--t-accent, var(--p-300))" },
];

// ── Component ──────────────────────────────────────────────────────
export function CardsTab() {
  return (
    <div className="grid grid-cols-4 gap-4">

      {/* ── Hero "Track expenses" — p-500 bold bg, col-span-2 row-span-2 ── */}
      <div
        className="col-span-2 row-span-2 rounded-2xl p-6 flex flex-col justify-between"
        style={{ backgroundColor: "var(--p-500)", color: "white", minHeight: 260 }}
      >
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--p-200)" }}>
            Monthly Overview
          </p>
          <p className="text-3xl font-bold mt-1">Track your expenses</p>
          <p className="text-5xl font-bold mt-2" style={{ color: "var(--p-100)" }}>$12,543</p>
        </div>
        <HeroBarChart />
      </div>

      {/* ── Donut chart — expenses breakdown ── */}
      <div className="rounded-2xl border p-4" style={{ backgroundColor: "var(--p-surface-1)" }}>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">Expenses</p>
        <p className="text-2xl font-bold mb-4">$14,919</p>
        <MiniDonut />
      </div>

      {/* ── "Gain control" — s-accent bold bg ── */}
      <div
        className="rounded-2xl p-5 flex flex-col justify-between"
        style={{ backgroundColor: "var(--s-accent, var(--p-700))", color: "white" }}
      >
        <div>
          <Target className="w-7 h-7 mb-2" style={{ color: "rgba(255,255,255,0.7)" }} />
          <p className="text-xl font-bold leading-tight">Gain control of your finances</p>
        </div>
        <p className="text-4xl font-bold mt-3" style={{ color: "rgba(255,255,255,0.85)" }}>+18%</p>
      </div>

      {/* ── Blog posts — 2 cols ── */}
      <div className="col-span-2 rounded-2xl border p-5" style={{ backgroundColor: "var(--p-surface-1)" }}>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
          Latest Posts
        </p>
        <div className="flex flex-col gap-3">
          {BLOG_POSTS.map((post, i) => (
            <div key={post.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: BLOG_BG[i] }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium leading-snug truncate">{post.title}</p>
                <p className="text-[10px] mt-0.5 text-muted-foreground">{post.category} · {post.read}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 flex-shrink-0 gap-1">
                Read <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ── "Create budgets" CTA — t-accent bold bg ── */}
      <div
        className="rounded-2xl p-5 flex flex-col justify-between"
        style={{ backgroundColor: "var(--t-accent, var(--p-600))", color: "white" }}
      >
        <div>
          <Zap className="w-6 h-6 mb-2" style={{ color: "rgba(255,255,255,0.7)" }} />
          <p className="text-sm font-bold">Create budgets</p>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Stay on track with smart limits</p>
        </div>
        <Button
          size="sm"
          className="mt-3 w-full h-7 text-xs"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          Get started
        </Button>
      </div>

      {/* ── Income stats — sparklines ── */}
      <div className="rounded-2xl border p-4" style={{ backgroundColor: "var(--p-surface-1)" }}>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">Income</p>
        <div className="flex flex-col gap-3">
          {[
            { label: "Savings",  value: "$15,969", up: true,  color: "var(--p-accent)" },
            { label: "Expenses", value: "$12,543", up: false, color: "var(--s-accent, var(--p-400))" },
          ].map(({ label, value, up, color }) => (
            <div key={label}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground">{label}</p>
                {up
                  ? <TrendingUp className="h-3 w-3" style={{ color }} />
                  : <TrendingDown className="h-3 w-3 text-muted-foreground" />}
              </div>
              <p className="text-base font-bold">{value}</p>
              <SparkLine color={color} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Login form — col-span-2 ── */}
      <div className="col-span-2 rounded-2xl border p-5" style={{ backgroundColor: "var(--p-surface-1)" }}>
        <div className="flex items-center gap-5">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-bold">Sign in to your account</p>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground mb-1">Email address</p>
              <div
                className="w-full h-8 rounded-md border px-3 flex items-center text-xs"
                style={{ borderColor: "var(--p-border)", backgroundColor: "var(--p-surface-2)", color: "var(--p-text-1)" }}
              >
                alice@example.com
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground mb-1">Password</p>
              <div
                className="w-full h-8 rounded-md border px-3 flex items-center text-xs text-muted-foreground"
                style={{ borderColor: "var(--p-border)", backgroundColor: "var(--p-surface-2)" }}
              >
                ••••••••
              </div>
            </div>
            <Button className="w-full h-8 text-xs">Sign in</Button>
          </div>
          <div
            className="w-28 h-28 rounded-xl flex-shrink-0 hidden sm:block"
            style={{ background: "linear-gradient(135deg, var(--t-400, var(--p-400)), var(--t-700, var(--p-700)))" }}
          />
        </div>
      </div>

      {/* ── Product card — p-900 dark bg ── */}
      <div
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: "var(--p-900)" }}
      >
        <div className="flex-1 flex items-center justify-center p-4">
          <div
            className="w-20 h-20 rounded-xl"
            style={{ background: "linear-gradient(135deg, var(--p-400), var(--s-accent, var(--p-600)))" }}
          />
        </div>
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--p-400)" }}>MacBook Pro</p>
          <p className="font-bold text-sm mt-0.5 text-white">14 inch</p>
          <div className="flex items-center justify-between mt-3">
            <p className="font-bold text-sm" style={{ color: "var(--p-300)" }}>$1,999</p>
            <Button
              size="sm"
              className="h-7 text-xs gap-1"
              style={{ backgroundColor: "var(--p-accent)", color: "white", border: "none" }}
            >
              <ShoppingCart className="h-3 w-3" /> Buy
            </Button>
          </div>
        </div>
      </div>

      {/* ── Expense progress bars ── */}
      <div className="rounded-2xl border p-5" style={{ backgroundColor: "var(--p-surface-1)" }}>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">Budget Usage</p>
        <div className="flex flex-col gap-3">
          {EXPENSES.map(({ label, amount, pct, color }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold tabular-nums">{amount}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Badges & status row — full width ── */}
      <div className="col-span-4 rounded-2xl border p-4 flex flex-wrap items-center gap-3" style={{ backgroundColor: "var(--p-surface-1)" }}>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mr-2">Status</p>
        <Badge style={{ backgroundColor: "var(--p-accent)", color: "#fff", border: "none" }}>Active</Badge>
        <Badge style={{ backgroundColor: "var(--s-accent, var(--p-300))", color: "#fff", border: "none" }}>Beta</Badge>
        <Badge style={{ backgroundColor: "var(--t-accent, var(--p-200))", color: "#fff", border: "none" }}>New</Badge>
        <Badge variant="outline">Stable</Badge>
        <Badge variant="secondary">Pending</Badge>
        <div className="ml-auto flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
            style={{ backgroundColor: "var(--p-surface-2)", color: "var(--p-text-1)", borderLeft: "3px solid var(--p-accent)" }}
          >
            ℹ Your export is ready to download.
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white"
            style={{ backgroundColor: "var(--p-accent)" }}
          >
            ✓ Palette saved.
          </div>
        </div>
      </div>

    </div>
  );
}
