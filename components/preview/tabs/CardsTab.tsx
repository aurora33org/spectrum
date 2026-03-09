"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ShoppingCart, ArrowRight } from "lucide-react";

// ── Mini bar charts ──────────────────────────────────────────────
const HERO_BARS  = [30, 55, 40, 70, 50, 80, 60, 90, 65, 85, 45, 95];
const SMALL_BARS = [45, 70, 55, 80, 60, 90, 50];

function HeroBarChart() {
  return (
    <div className="flex items-end gap-1 h-12 mt-3">
      {HERO_BARS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            backgroundColor: i % 3 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
            minWidth: 3,
          }}
        />
      ))}
    </div>
  );
}

function SmallBarChart() {
  return (
    <div className="flex items-end gap-0.5 h-8 mt-2">
      {SMALL_BARS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            backgroundColor: `var(--p-${[300, 400, 500, 600][i % 4]})`,
            minWidth: 3,
          }}
        />
      ))}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────
const EXPENSE_ITEMS = [
  { label: "Uncategorized", amount: "$4,201", color: "var(--s-400, var(--p-400))" },
  { label: "Groceries",     amount: "$4,875", color: "var(--s-600, var(--p-600))" },
  { label: "Restaurant",    amount: "$4,815", color: "var(--t-500, var(--p-500))" },
];

const BLOG_POSTS = [
  { category: "Productivity", title: "Productivity Hacks for Remote Teams",  read: "4 min" },
  { category: "Design",       title: "The Ultimate Digital Design Toolkit",   read: "6 min" },
  { category: "Teams",        title: "Design in Cross-Functional Teams",      read: "3 min" },
];

const BLOG_GRADIENTS = [
  "linear-gradient(135deg, var(--p-300), var(--p-500))",
  "linear-gradient(135deg, var(--s-300, var(--p-300)), var(--s-500, var(--p-500)))",
  "linear-gradient(135deg, var(--t-300, var(--p-300)), var(--t-500, var(--p-500)))",
];

const ALERTS = [
  { icon: "ℹ", message: "Your export is ready to download.", accent: false },
  { icon: "✓", message: "Palette saved to history.",        accent: true  },
];

// ── Component ────────────────────────────────────────────────────
export function CardsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">

      {/* ── Hero "Track your expenses" — 2 cols ── */}
      <Card
        className="col-span-2 p-5 border-0"
        style={{ backgroundColor: "var(--p-800)", color: "white" }}
      >
        <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--p-300)" }}>
          Monthly Overview
        </p>
        <p className="text-2xl font-bold mt-0.5">Track your expenses</p>
        <p className="text-3xl font-bold" style={{ color: "var(--p-200)" }}>$12,543</p>
        <HeroBarChart />
      </Card>

      {/* ── Expense breakdown ── */}
      <Card className="p-5">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">
          Expenses
        </p>
        <p className="text-2xl font-bold mb-4">$14,919</p>
        <div className="flex flex-col gap-2.5">
          {EXPENSE_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex-1 text-muted-foreground">{item.label}</span>
              <span className="font-semibold tabular-nums">{item.amount}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 3 stat cards ── */}
      <Card className="p-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Savings</p>
        <p className="text-xl font-bold mt-1">$15,969</p>
        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--p-accent)" }}>
          <TrendingUp className="h-3 w-3" /> 8,653 per year
        </p>
        <SmallBarChart />
      </Card>
      <Card className="p-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Expenses</p>
        <p className="text-xl font-bold mt-1">$12,543</p>
        <p className="text-xs mt-1 flex items-center gap-1 text-muted-foreground">
          <TrendingDown className="h-3 w-3" /> 3,410 per year
        </p>
        <SmallBarChart />
      </Card>
      <Card className="p-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Budget left</p>
        <p className="text-xl font-bold mt-1">$5,210</p>
        <p className="text-xs mt-1 text-muted-foreground">+2,100 per year</p>
        <SmallBarChart />
      </Card>

      {/* ── Blog post list — 2 cols ── */}
      <Card className="col-span-2 p-5">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
          Blog
        </p>
        <div className="flex flex-col gap-3">
          {BLOG_POSTS.map((post, i) => (
            <div key={post.title} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex-shrink-0"
                style={{ background: BLOG_GRADIENTS[i] }}
              />
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
      </Card>

      {/* ── CTA "Create budgets" — secondary accent ── */}
      <Card
        className="p-5 flex flex-col justify-between border-0"
        style={{ backgroundColor: "var(--s-accent, var(--p-accent))" }}
      >
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-white/70">Budget planner</p>
          <p className="text-lg font-bold text-white mt-1">Create budgets</p>
          <p className="text-xs text-white/70 mt-1">Stay on track with smart limits</p>
        </div>
        <Button
          size="sm"
          className="mt-4 w-full h-8 text-xs"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          Get started
        </Button>
      </Card>

      {/* ── Login form — 2 cols, tertiary gradient ── */}
      <Card className="col-span-2 p-5">
        <div className="flex items-center gap-5">
          <div className="flex-1 space-y-3">
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
            <p className="text-center text-[10px] text-muted-foreground">
              No account?{" "}
              <span className="font-medium" style={{ color: "var(--p-accent)" }}>Sign up</span>
            </p>
          </div>
          <div
            className="w-28 h-28 rounded-xl flex-shrink-0 hidden sm:block"
            style={{ background: "linear-gradient(135deg, var(--t-400, var(--p-400)), var(--t-700, var(--p-700)))" }}
          />
        </div>
      </Card>

      {/* ── Product card ── */}
      <Card className="overflow-hidden">
        <div
          className="h-32 flex items-center justify-center"
          style={{ backgroundColor: "var(--p-surface-2)" }}
        >
          <div
            className="w-20 h-20 rounded-xl"
            style={{ background: "linear-gradient(135deg, var(--p-300), var(--p-500))", opacity: 0.8 }}
          />
        </div>
        <CardContent className="p-4">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">MacBook Pro</p>
          <p className="font-bold text-sm mt-0.5">14 inch</p>
          <div className="flex items-center justify-between mt-3">
            <p className="font-bold text-sm" style={{ color: "var(--p-accent)" }}>$1,999</p>
            <Button size="sm" className="h-7 text-xs gap-1">
              <ShoppingCart className="h-3 w-3" /> Shop now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Alerts & badges — full width ── */}
      <Card className="col-span-3 p-5">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
          Notifications & Badges
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          {ALERTS.map((a) => (
            <div
              key={a.message}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={
                a.accent
                  ? { backgroundColor: "var(--p-accent)", color: "#ffffff" }
                  : { backgroundColor: "var(--p-surface-2)", color: "var(--p-text-1)", borderLeft: "3px solid var(--p-accent)" }
              }
            >
              <span>{a.icon}</span>
              {a.message}
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <Badge>New</Badge>
            <Badge variant="secondary">Beta</Badge>
            <Badge variant="outline">Stable</Badge>
            <Badge
              style={{ backgroundColor: "var(--p-badge)", color: "var(--p-badge-text)", border: "none" }}
            >
              3 updated
            </Badge>
          </div>
        </div>
      </Card>

      {/* ── Data table — full width ── */}
      <Card className="col-span-3 overflow-hidden p-0">
        <div
          className="grid grid-cols-5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest"
          style={{ backgroundColor: "var(--p-surface-2)", color: "var(--p-text-2)" }}
        >
          {["ID", "Name", "Role", "Status", "Joined"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {[
          { id: "001", name: "Alice Chen",  role: "Designer", status: "Active", joined: "Jan 2024" },
          { id: "002", name: "Bob Martin",  role: "Engineer", status: "Active", joined: "Mar 2024" },
          { id: "003", name: "Carol White", role: "PM",       status: "Away",   joined: "Jun 2024" },
          { id: "004", name: "David Lee",   role: "Engineer", status: "Active", joined: "Aug 2024" },
        ].map((row, i) => (
          <div
            key={row.id}
            className="grid grid-cols-5 px-5 py-2.5 text-xs border-t"
            style={{
              backgroundColor: i % 2 === 0 ? "var(--p-surface-1)" : "transparent",
              borderColor: "var(--p-border)",
              color: "var(--p-text-1)",
            }}
          >
            <span className="font-mono text-muted-foreground">#{row.id}</span>
            <span className="font-medium">{row.name}</span>
            <span className="text-muted-foreground">{row.role}</span>
            <span>
              <Badge
                className="text-[10px] py-0"
                style={
                  row.status === "Active"
                    ? { backgroundColor: "var(--p-accent)", color: "#fff", border: "none" }
                    : { backgroundColor: "var(--s-accent, var(--p-300))", color: "var(--p-text-1)", border: "none" }
                }
              >
                {row.status}
              </Badge>
            </span>
            <span className="text-muted-foreground">{row.joined}</span>
          </div>
        ))}
      </Card>

    </div>
  );
}
