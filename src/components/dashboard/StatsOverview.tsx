"use client"

import { ArrowUp, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ResponsiveContainer, AreaChart, Area } from "recharts"
import { useDataset } from "@/context/DatasetContext"
import { useMemo } from "react"

export function StatsOverview() {
    const { tickets, insights } = useDataset()

    const stats = useMemo(() => {
        const totalTickets = tickets.length
        const highPriority = tickets.filter(t => t.priority === "high" || t.priority === "critical").length
        const slaRisk = tickets.filter(t => t.slaRisk === "breached" || t.slaRisk === "at-risk").length

        // Count unique non-noise duplicate clusters (-1 is noise in DBSCAN)
        const clusterCount = insights?.top_recurring_clusters
            ? Object.keys(insights.top_recurring_clusters).filter(k => k !== "-1").length
            : 0

        // Average resolution time from tickets with aiConfidence > 0 (has predictions)
        const ticketsWithPrediction = tickets.filter(t => t.aiConfidence > 0)
        const avgResMinutes = ticketsWithPrediction.length > 0
            ? ticketsWithPrediction.reduce((sum, t) => sum + (t.aiConfidence > 0 ? 1 : 0), 0) // placeholder
            : 0

        // Use risk distribution for avg resolution display
        const riskDist = insights?.risk_distribution || {}
        const criticalCount = riskDist["Critical"] || 0
        const highCount = riskDist["High"] || 0

        const dateStats = insights?.daily_volume_trend ? Object.keys(insights.daily_volume_trend) : []
        const dateRange = dateStats.length > 0 ? `${dateStats.length} Days` : "N/A"

        return [
            {
                label: "Total Tickets",
                value: totalTickets.toLocaleString(),
                change: `${totalTickets}`,
                trend: "up" as const,
                color: "text-blue-600",
                chartColor: "#2563eb",
                data: [{ value: Math.round(totalTickets * 0.7) }, { value: Math.round(totalTickets * 0.8) }, { value: Math.round(totalTickets * 0.85) }, { value: Math.round(totalTickets * 0.9) }, { value: Math.round(totalTickets * 0.95) }, { value: totalTickets }]
            },
            {
                label: "Date Range",
                value: dateRange,
                change: "Dataset Span",
                trend: "up" as const,
                color: "text-zinc-600",
                chartColor: "#71717a",
                data: [{ value: 1 }, { value: 1 }, { value: 1 }]
            },
            {
                label: "SLA Risk",
                value: String(slaRisk),
                change: `${Math.round((slaRisk / Math.max(totalTickets, 1)) * 100)}%`,
                trend: slaRisk > totalTickets * 0.3 ? "up" as const : "down" as const,
                color: "text-amber-600",
                chartColor: "#d97706",
                data: [{ value: Math.round(slaRisk * 1.2) }, { value: Math.round(slaRisk * 1.1) }, { value: slaRisk }, { value: Math.round(slaRisk * 0.95) }, { value: slaRisk }]
            },
            {
                label: "Duplicate Clusters",
                value: String(clusterCount),
                change: `${clusterCount}`,
                trend: "up" as const,
                color: "text-purple-600",
                chartColor: "#9333ea",
                data: [{ value: Math.max(1, clusterCount - 2) }, { value: Math.max(1, clusterCount - 1) }, { value: clusterCount }, { value: clusterCount }, { value: clusterCount }]
            },
            {
                label: "Critical Tickets",
                value: String(criticalCount + highCount),
                change: `${criticalCount} critical`,
                trend: criticalCount > 0 ? "up" as const : "down" as const,
                color: "text-green-600",
                chartColor: "#16a34a",
                data: [{ value: criticalCount + highCount + 2 }, { value: criticalCount + highCount + 1 }, { value: criticalCount + highCount }]
            },
        ]
    }, [tickets, insights])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</h3>
                        <div className={cn(
                            "flex items-center text-xs font-medium",
                            stat.trend === "up" && (stat.label === "Total Tickets") ? "text-green-600" :
                                stat.trend === "down" && (stat.label === "SLA Risk") ? "text-green-600" :
                                    "text-red-500"
                        )}>
                            {stat.change}
                            {stat.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                        <div className="h-8 w-20">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stat.data}>
                                    <defs>
                                        <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={stat.chartColor} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={stat.chartColor} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={stat.chartColor}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill={`url(#color-${index})`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
