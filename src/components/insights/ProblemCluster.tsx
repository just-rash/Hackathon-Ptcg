"use client"

import { Network, AlertCircle, Hash, ChevronDown, ChevronUp, Code } from "lucide-react"
import { useDataset } from "@/context/DatasetContext"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export function ProblemCluster() {
    const { insights } = useDataset()
    const [expandedCluster, setExpandedCluster] = useState<string | null>(null)
    const [showRaw, setShowRaw] = useState(false)

    const clusters = useMemo(() => {
        if (!insights?.top_recurring_clusters || !insights?.cluster_details) return []
        return Object.entries(insights.top_recurring_clusters)
            .filter(([id]) => id !== "-1")
            .sort((a, b) => b[1] - a[1]) // We'll keep sort for UI but data is raw from backend
            .slice(0, 10)
            .map(([id, count]) => ({
                id,
                name: `Cluster-${id}`,
                type: insights.cluster_details[id]?.type || "General Issue",
                count: insights.cluster_details[id]?.size || count,
                ticketIds: insights.cluster_details[id]?.ticket_ids || []
            }))
    }, [insights])

    const totalDuplicates = clusters.reduce((sum, c) => sum + c.count, 0)

    const toggleCluster = (id: string) => {
        setExpandedCluster(expandedCluster === id ? null : id)
    }

    if (showRaw) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Code className="text-zinc-500" size={20} />
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Raw Logic Output</h2>
                    </div>
                    <button
                        onClick={() => setShowRaw(false)}
                        className="text-[10px] font-bold text-blue-500 hover:text-blue-600 uppercase tracking-widest"
                    >
                        Hide Raw
                    </button>
                </div>
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-lg overflow-auto border border-zinc-100 dark:border-zinc-800">
                    <pre className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                        {JSON.stringify(insights?.cluster_details, null, 2)}
                    </pre>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Network className="text-orange-600 dark:text-orange-400" size={20} />
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">AI Powered Clustering</h2>
                </div>
                <button
                    onClick={() => setShowRaw(true)}
                    className="text-[10px] font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-widest flex items-center gap-1"
                >
                    <Code size={12} />
                    Raw JSON
                </button>
            </div>

            {clusters.length > 0 ? (
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {clusters.map((cluster, index) => (
                        <div
                            key={cluster.id}
                            className={cn(
                                "flex flex-col p-3 rounded-lg border transition-all duration-200",
                                expandedCluster === cluster.id
                                    ? "border-orange-500 bg-orange-50/30 dark:bg-orange-900/10"
                                    : "border-zinc-100 dark:border-zinc-800 hover:border-orange-200 dark:hover:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/5 cursor-pointer"
                            )}
                            onClick={() => toggleCluster(cluster.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xs font-bold shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs block">{cluster.type}</span>
                                        <p className="text-[10px] text-zinc-500 font-mono">ID: {cluster.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{cluster.count}</span>
                                        <div className="h-1 w-12 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
                                            <div
                                                className="h-full bg-orange-500 rounded-full"
                                                style={{ width: `${Math.round((cluster.count / Math.max(totalDuplicates, 1)) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                    {expandedCluster === cluster.id ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                                </div>
                            </div>

                            {/* Ticket IDs Stack/List */}
                            {expandedCluster === cluster.id && (
                                <div className="mt-4 pt-4 border-t border-orange-100 dark:border-orange-800/50">
                                    <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                        <Hash size={10} />
                                        Linked Ticket IDs
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-mono">
                                        [{cluster.ticketIds.join(', ')}]
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                            <span>Total duplicate tickets grouped</span>
                            <span className="font-bold text-orange-600">{totalDuplicates}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-zinc-400">
                        <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No duplicate clusters detected</p>
                    </div>
                </div>
            )}
        </div>
    )
}
