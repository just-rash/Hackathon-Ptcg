"use client"

import { Lightbulb, BookOpen, ExternalLink, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function ProactiveInsights() {
    const insights = [
        {
            type: "critical",
            title: "Spike detected in VPN-related incidents.",
            description: "Unusual volume of 45 VPN tickets in the last hour. Correlated with Network Ops maintenance window.",
            actionLabel: "View Cluster",
        },
        {
            type: "warning",
            title: "32 tickets likely to breach SLA.",
            description: "High volume of 'Email Access' tickets in queue exceeding standard resolution time.",
            actionLabel: "View At-Risk Tickets",
        },
        {
            type: "info",
            title: "Recurring issue detected: Email Server Timeout.",
            description: "Pattern match found across 12 recent tickets. Suggested root cause: Exchange Server Load Balancer.",
            actionLabel: "View Root Cause Analysis",
        },
        {
            type: "trend",
            title: "Top driver this week: Login failures.",
            description: "Login failures account for 28% of total volume, up from 15% last week.",
            actionLabel: "View Trend Details",
        },
    ]

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <Lightbulb size={20} />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">AI Intelligence Panel</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {insights.map((insight, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-left p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-white dark:hover:bg-zinc-800 transition-all group h-full flex flex-col"
                    >
                        <div className="mb-3">
                            {insight.type === 'critical' ? (
                                <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Critical Spike</span>
                            ) : insight.type === 'warning' ? (
                                <span className="px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">SLA Risk</span>
                            ) : insight.type === 'info' ? (
                                <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Pattern Detected</span>
                            ) : (
                                <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">Trend Analysis</span>
                            )}
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {insight.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                            {insight.description}
                        </p>
                        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700 flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {insight.actionLabel} <ArrowRight size={12} className="ml-1" />
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
