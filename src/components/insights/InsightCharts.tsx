"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { AlertOctagon, TrendingDown, Activity } from "lucide-react"
import { useDataset } from "@/context/DatasetContext"
import { useMemo } from "react"



export function TopRecurringIssuesChart() {
    const { insights } = useDataset()

    const data = useMemo(() => {
        if (!insights?.top_recurring_clusters) return []
        // Return randomized dummy output from backend "as it is"
        return Object.entries(insights.top_recurring_clusters)
            .map(([issue, count]) => ({
                issue: issue.charAt(0).toUpperCase() + issue.slice(1).replace('_', ' '),
                count: Number(count)
            }))
    }, [insights])

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Top Recurring Issues</h3>
            <p className="text-xs text-zinc-500 mb-6">Common keywords identified in ticket descriptions</p>
            <div className="h-[300px] w-full">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="issue"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={160}
                                tick={{ fontSize: 10, fill: '#71717a', fontWeight: 500 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-400 text-sm italic">
                        No recurring issues detected
                    </div>
                )}
            </div>
        </div>
    )
}

// End of file

