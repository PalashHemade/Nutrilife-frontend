"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const S = {
  bg: "#020817",
  sidebar: "#0a1628",
  card: "#0f172a",
  border: "#1e293b",
  text: "#f1f5f9",
  muted: "#64748b",
  green: "#10b981",
  accent: "#06b6d4",
};

const meals = [
  { name: "Grilled Salmon & Quinoa",  cal: 520, tag: "Lunch",   time: "12:30 PM" },
  { name: "Avocado Turkey Wrap",       cal: 380, tag: "Dinner",  time: "7:00 PM" },
  { name: "Greek Yogurt Parfait",      cal: 220, tag: "Snack",   time: "3:00 PM" },
  { name: "Protein Oat Smoothie",      cal: 340, tag: "Breakfast", time: "8:00 AM" },
];

const macros = [
  { name: "Protein",  current: 96,  target: 120, unit: "g", color: "#10b981" },
  { name: "Carbs",    current: 110, target: 150, unit: "g", color: "#f59e0b" },
  { name: "Fats",     current: 38,  target: 55,  unit: "g", color: "#a78bfa" },
  { name: "Fiber",    current: 18,  target: 30,  unit: "g", color: "#06b6d4" },
];

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeNav, setActiveNav] = useState("dashboard");
  const name = session?.user?.name || "User";

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard"    },
    { id: "meals",     icon: "🥗", label: "Meal Plan"    },
    { id: "progress",  icon: "📊", label: "Progress"     },
    { id: "profile",   icon: "👤", label: "Profile"      },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: S.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: S.text }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 220, background: S.sidebar, borderRight: `1px solid ${S.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${S.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${S.green},#059669)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <span style={{ fontWeight: 800, fontSize: 16 }}>NutriLife</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setActiveNav(n.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, marginBottom: 4, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.15s",
                background: activeNav === n.id ? "rgba(16,185,129,0.15)" : "transparent", color: activeNav === n.id ? S.green : S.muted }}>
              <span style={{ fontSize: 18 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: `1px solid ${S.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "0 4px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${S.green},#059669)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: S.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
              <p style={{ fontSize: 11, color: S.muted }}>User</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })}
            style={{ width: "100%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", borderRadius: 8, padding: "8px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 }}>Good morning, {name.split(" ")[0]} 👋</h1>
          <p style={{ fontSize: 14, color: S.muted }}>Your personalized nutrition overview for today.</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Daily Calories", val: "1,850", sub: "kcal target",  icon: "🔥", accent: "#f59e0b" },
            { label: "Protein",        val: "96g",   sub: "of 120g",       icon: "💪", accent: "#10b981" },
            { label: "Next Meal",      val: "12:30", sub: "Grilled Salmon", icon: "🍽️", accent: "#06b6d4" },
            { label: "Hydration",      val: "1.4L",  sub: "of 2.5L today",  icon: "💧", accent: "#a78bfa" },
          ].map(c => (
            <div key={c.label} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <p style={{ fontSize: 12, color: S.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</p>
                <span style={{ fontSize: 22 }}>{c.icon}</span>
              </div>
              <p style={{ fontSize: 26, fontWeight: 900, color: c.accent, marginBottom: 3 }}>{c.val}</p>
              <p style={{ fontSize: 11, color: S.muted }}>{c.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

          {/* AI Meal Plan */}
          <div style={{ gridColumn: "span 2", background: S.card, border: `1px solid ${S.border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>🤖 AI Meal Plan</h2>
              <span style={{ fontSize: 12, background: "rgba(16,185,129,0.15)", color: S.green, padding: "3px 12px", borderRadius: 999, fontWeight: 600 }}>Today</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {meals.map(m => (
                <div key={m.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#1e293b", borderRadius: 12, border: `1px solid ${S.border}` }}>
                  <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, background: "rgba(16,185,129,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🥘</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: S.text, marginBottom: 2 }}>{m.name}</p>
                      <p style={{ fontSize: 12, color: S.muted }}>{m.cal} kcal · {m.time}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, background: "rgba(6,182,212,0.15)", color: S.accent, padding: "3px 10px", borderRadius: 999, fontWeight: 600, flexShrink: 0 }}>{m.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Macro Goals */}
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>🎯 Macro Goals</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {macros.map(m => {
                const pct = Math.round((m.current / m.target) * 100);
                return (
                  <div key={m.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>{m.name}</span>
                      <span style={{ fontSize: 12, color: S.muted }}>{m.current}{m.unit} / {m.target}{m.unit}</span>
                    </div>
                    <div style={{ height: 7, background: "#1e293b", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: m.color, borderRadius: 999, transition: "width 1s ease" }}>
                      </div>
                    </div>
                    <p style={{ fontSize: 11, color: S.muted, marginTop: 5 }}>{pct}% complete</p>
                  </div>
                );
              })}
            </div>

            {/* Streak */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${S.border}` }}>
              <p style={{ fontSize: 12, color: S.muted, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>Weekly Streak 🔥</p>
              <div style={{ display: "flex", gap: 6 }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ width: "100%", height: 32, borderRadius: 8, marginBottom: 5, background: i < 4 ? S.green : "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {i < 4 && <span style={{ fontSize: 12 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 10, color: S.muted }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
