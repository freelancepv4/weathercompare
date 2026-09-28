"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export interface ComparisonSeries {
  id: string;
  name: string;
  color: string;
}

/** The Recharts part of ComparisonChart, split out so it loads lazily. */
export function ComparisonLines({
  data,
  series,
  unit,
}: {
  data: Record<string, string | number>[];
  series: ComparisonSeries[];
  unit: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-white/10" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
        <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" unit={unit} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
          formatter={(value: number) => [`${value}°`, ""]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s) => (
          <Line key={s.id} type="monotone" dataKey={s.name} stroke={s.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
