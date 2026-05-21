"use client";

import { useEffect, useState } from "react";

type WaitlistRow = { id: string; email: string; name: string | null; source: string | null; created_at: string };
type ContactRow = { id: string; name: string | null; email: string; contact: string | null; enquiry: string; created_at: string };
type TransactionRow = { id: string; email: string | null; package_id: string | null; points: number | null; amount_myr: number | null; payment_method: string | null; status: string; created_at: string };
type UserRow = { id: string; name: string | null; email: string | null; created_at: string };

type AdminData = {
  waitlist: WaitlistRow[];
  contacts: ContactRow[];
  transactions: TransactionRow[];
  users: UserRow[];
};

const tabs = ["Overview", "Users", "Transactions", "Waitlist", "Contact"] as const;
type Tab = typeof tabs[number];

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-MY", { dateStyle: "short", timeStyle: "short" });
}

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("Overview");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-slate-400">Loading…</div>;
  }

  if (!data || "error" in data) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Access denied.</div>;
  }

  const totalRevenue = data.transactions.reduce((s, t) => s + (t.amount_myr ?? 0), 0);
  const totalPoints = data.transactions.reduce((s, t) => s + (t.points ?? 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">GanjaranX internal panel</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${tab === t ? "bg-[#1b2660] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Registered Users", value: data.users.length, icon: "👤" },
            { label: "Waitlist Signups", value: data.waitlist.length, icon: "📋" },
            { label: "Total Transactions", value: data.transactions.length, icon: "💳" },
            { label: "Revenue (MYR)", value: `RM ${totalRevenue.toFixed(2)}`, icon: "💰" },
            { label: "Points Issued", value: totalPoints.toLocaleString(), icon: "⚡" },
            { label: "Contact Messages", value: data.contacts.length, icon: "✉️" },
            { label: "Billplz Payments", value: data.transactions.filter(t => t.payment_method === "billplz").length, icon: "🏦" },
            { label: "Stripe Payments", value: data.transactions.filter(t => t.payment_method === "stripe").length, icon: "💳" },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "Users" && (
        <Table
          headers={["Name", "Email", "Joined"]}
          rows={data.users.map(u => [u.name ?? "—", u.email ?? "—", fmt(u.created_at)])}
          empty="No users yet"
        />
      )}

      {tab === "Transactions" && (
        <Table
          headers={["Email", "Package", "Points", "Amount (MYR)", "Method", "Status", "Date"]}
          rows={data.transactions.map(t => [
            t.email ?? "—",
            t.package_id ?? "—",
            t.points?.toLocaleString() ?? "—",
            t.amount_myr ? `RM ${t.amount_myr}` : "—",
            t.payment_method ?? "—",
            <span key={t.id} className={`px-2 py-0.5 rounded-full text-xs font-bold ${t.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>,
            fmt(t.created_at),
          ])}
          empty="No transactions yet"
        />
      )}

      {tab === "Waitlist" && (
        <Table
          headers={["Email", "Name", "Source", "Date"]}
          rows={data.waitlist.map(w => [w.email, w.name ?? "—", w.source ?? "—", fmt(w.created_at)])}
          empty="No waitlist entries"
        />
      )}

      {tab === "Contact" && (
        <div className="flex flex-col gap-4">
          {data.contacts.length === 0 && <p className="text-slate-400 text-sm">No messages yet.</p>}
          {data.contacts.map(c => (
            <div key={c.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{c.name ?? "Unknown"}</p>
                  <p className="text-sm text-[#f5a623]">{c.email}</p>
                  {c.contact && <p className="text-xs text-slate-400">{c.contact}</p>}
                </div>
                <p className="text-xs text-slate-400 whitespace-nowrap">{fmt(c.created_at)}</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.enquiry}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Table({ headers, rows, empty }: { headers: string[]; rows: (string | React.ReactNode)[][]; empty: string }) {
  if (rows.length === 0) return <p className="text-slate-400 text-sm">{empty}</p>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <tr>{headers.map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row, i) => (
            <tr key={i} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {row.map((cell, j) => <td key={j} className="px-4 py-3 text-slate-700 dark:text-slate-300">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
