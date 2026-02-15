"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar } from "recharts"
import { useDataset } from "@/context/DatasetContext"
import { useMemo } from "react"

export function TicketVolumeChart() {
    const { insights } = useDataset()

    const volumeData = useMemo(() => {
        if (!insights?.team_workload) return []
        return Object.entries(insights.team_workload).map(([team, count]) => ({
            team: team.length > 12 ? team.substring(0, 12) + "…" : team,
            tickets: count,
        }))
    }, [insights])

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Team Workload Distribution</h3>
            </div>
            <div className="h-[250px] w-full">
                {volumeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={volumeData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                            <XAxis
                                dataKey="team"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#71717a' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#71717a' }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="tickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
                        No data available
                    </div>
                )}
            </div>
        </div>
    )
}

export function PriorityDistributionChart() {
    const { insights } = useDataset()

    const COLORS: Record<string, string> = {
        Low: '#3b82f6',      // Blue
        Medium: '#eabb08',   // Yellow
        High: '#f97316',     // Orange
        Critical: '#dc2626', // Red
    }

    const priorityData = useMemo(() => {
        if (!insights?.risk_distribution) return []
        return Object.entries(insights.risk_distribution).map(([name, value]) => ({
            name,
            value,
            color: COLORS[name] || '#6b7280',
        }))
    }, [insights])

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Risk Distribution</h3>
            <div className="h-[250px] w-full flex items-center justify-center">
                {priorityData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={priorityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-zinc-400 text-sm">No data available</div>
                )}
            </div>
        </div>
    )
}
