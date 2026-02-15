"use client"

import { TrendAnalysis } from "@/components/insights/TrendAnalysis"
import { ProblemCluster } from "@/components/insights/ProblemCluster"
import { TopRecurringIssuesChart } from "@/components/insights/InsightCharts"
import { motion } from "framer-motion"
import { Calendar, Download } from "lucide-react"

export default function InsightsPage() {
    return (
        <div className="space-y-6 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
                    >
                        Systemic Analytics
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 dark:text-zinc-400 text-sm mt-1"
                    >
                        Deep dive into operational metrics, recurring patterns, and forecasting.
                    </motion.p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                        <Calendar size={16} />
                        <span>Last 30 Days</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                        <Download size={16} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Row 1: Trend Analysis (Full Width) */}
            <div className="h-[400px] mb-6">
                <TrendAnalysis />
            </div>

            {/* Row 2: Problem Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                <TopRecurringIssuesChart />
                <ProblemCluster />
            </div>
        </div>
    )
}
