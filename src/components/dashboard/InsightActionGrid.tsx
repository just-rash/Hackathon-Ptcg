"use client"

import { Activity, AlertTriangle, Lightbulb, TrendingUp, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useDataset } from "@/context/DatasetContext"

export function InsightActionGrid() {
    const router = useRouter()
    const { tickets, insights } = useDataset()
    const [selectedPattern, setSelectedPattern] = useState(false)

    // Compute dynamic counts
    const criticalCount = tickets.filter(t => t.priority === "critical").length
    const slaRiskCount = tickets.filter(t => t.slaRisk === "breached" || t.slaRisk === "at-risk").length
    const clusterCount = insights
        ? Object.keys(insights.top_recurring_clusters).filter(k => k !== "-1").length
        : 0
    const topTeam = insights?.team_workload
        ? Object.entries(insights.team_workload).sort((a, b) => b[1] - a[1])[0]
        : null

    const handleNavigation = (route: string) => {
        router.push(route)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* 1. Critical Spike */}
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation("/tickets?filter=critical")}
                    className="relative overflow-hidden group p-6 rounded-2xl bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-zinc-900 border border-red-100 dark:border-red-900/30 text-left hover:shadow-lg hover:shadow-red-500/10 transition-all"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Activity size={80} className="text-red-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <Activity size={24} />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wide">
                            Urgent
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        Critical Tickets
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                        {criticalCount > 0
                            ? `${criticalCount} critical ticket${criticalCount > 1 ? 's' : ''} detected requiring immediate attention.`
                            : "No critical tickets detected at this time."}
                    </p>
                    <div className="flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                        View Critical Tickets <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>

                {/* 2. SLA Risk */}
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation("/tickets?filter=sla-risk")}
                    className="relative overflow-hidden group p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-zinc-900 border border-amber-100 dark:border-amber-900/30 text-left hover:shadow-lg hover:shadow-amber-500/10 transition-all"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <AlertTriangle size={80} className="text-amber-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <AlertTriangle size={24} />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wide">
                            Action Req.
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        SLA Risk
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                        {slaRiskCount > 0
                            ? `${slaRiskCount} ticket${slaRiskCount > 1 ? 's' : ''} approaching or past SLA breach.`
                            : "All tickets within SLA limits."}
                    </p>
                    <div className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
                        Review At-Risk Queue <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>

                {/* 3. Pattern Detected */}
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation("/insights#clusters")}
                    className="relative overflow-hidden group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-zinc-900 border border-blue-100 dark:border-blue-900/30 text-left hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Lightbulb size={80} className="text-blue-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Lightbulb size={24} />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
                            Insight
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Duplicate Clusters
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                        {clusterCount > 0
                            ? `${clusterCount} duplicate cluster${clusterCount > 1 ? 's' : ''} detected across tickets.`
                            : "No duplicate patterns detected."}
                    </p>
                    <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                        View Cluster Graph <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>

                {/* 4. Top Trends */}
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation("/insights")}
                    className="relative overflow-hidden group p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/10 dark:to-zinc-900 border border-purple-100 dark:border-purple-900/30 text-left hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp size={80} className="text-purple-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <TrendingUp size={24} />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wide">
                            Trend
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        Top Workload
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                        {topTeam
                            ? `${topTeam[0]} leads with ${topTeam[1]} ticket${topTeam[1] > 1 ? 's' : ''} assigned.`
                            : "No workload data available yet."}
                    </p>
                    <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                        View All Insights <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.button>
            </div>

            {/* Popup Overlay for Pattern */}
            <AnimatePresence>
                {selectedPattern && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPattern(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl w-full max-w-lg relative z-10 border border-zinc-200 dark:border-zinc-800"
                        >
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                                <Lightbulb className="text-blue-500" /> Cluster Details
                            </h3>
                            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 mb-4">
                                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                                    <strong>Clusters Found:</strong> {clusterCount}
                                </p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                    <strong>Total Tickets:</strong> {tickets.length}
                                </p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedPattern(false)}
                                    className="px-4 py-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium text-sm transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => router.push('/tickets')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-sm transition-colors"
                                >
                                    View All Tickets
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
