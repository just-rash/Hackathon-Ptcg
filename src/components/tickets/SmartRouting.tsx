"use client"

import { Users, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useDataset } from "@/context/DatasetContext"
import { useMemo } from "react"

export function SmartRouting() {
    const { insights } = useDataset()

    const suggestions = useMemo(() => {
        if (!insights?.team_workload) return []

        const entries = Object.entries(insights.team_workload)
            .sort((a, b) => b[1] - a[1])

        const totalTickets = entries.reduce((sum, [, count]) => sum + count, 0)

        return entries.map(([group, count]) => ({
            group,
            confidence: Math.round((count / Math.max(totalTickets, 1)) * 100),
            reason: `Handles ${count} ticket${count > 1 ? 's' : ''} in this dataset`,
        }))
    }, [insights])

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Users className="text-blue-600 dark:text-blue-400" size={20} />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Smart Routing</h2>
            </div>

            <div className="space-y-3">
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <motion.div
                            key={suggestion.group}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group cursor-pointer"
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{suggestion.group}</span>
                                    {index === 0 && (
                                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                            MOST ACTIVE
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    {suggestion.reason}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm px-2 py-1 rounded-md">
                                    {suggestion.confidence}%
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-blue-600 text-white rounded-md">
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center text-zinc-400 text-sm py-6">
                        Upload a dataset to see routing suggestions.
                    </div>
                )}
            </div>
        </div>
    )
}
