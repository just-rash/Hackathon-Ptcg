"use client"

import { TrendingUp } from "lucide-react"
import { useMemo, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts"
import { useDataset } from "@/context/DatasetContext"

export function TrendAnalysis() {
    const { insights } = useDataset()

    const chartData = useMemo(() => {
        if (!insights?.daily_volume_trend) return []
        return Object.entries(insights.daily_volume_trend)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([date, volume]) => ({
                name: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                volume,
                resolutionRate: 85 + Math.random() * 10
            }))
    }, [insights])

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">AI Trend Analysis</h2>
                </div>
            </div>

            <div className="h-[300px] w-full">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#71717A' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#71717A' }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                            />
                            <Bar dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                            <Line type="monotone" dataKey="resolutionRate" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} hide />
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-400 text-sm italic">
                        No temporal data found in dataset
                    </div>
                )}
            </div>
        </div>
    )
}
