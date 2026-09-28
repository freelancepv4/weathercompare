"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

/** The Recharts part of RainSection, split out so it loads lazily. */
export function RainArea({ data, probabilityLabel }: { data: { label: string; probability: number }[]; probabilityLabel: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="rainFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2478ff" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#2478ff" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-white/10" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
        <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" unit="%" domain={[0, 100]} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} formatter={(v: number) => [`${v}%`, probabilityLabel]} />
        <Area type="monotone" dataKey="probability" stroke="#2478ff" strokeWidth={2.5} fill="url(#rainFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
