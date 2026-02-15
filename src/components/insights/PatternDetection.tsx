"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, AlertTriangle } from "lucide-react"

const data = [
    { name: 'Mon', incidents: 4 },
    { name: 'Tue', incidents: 3 },
    { name: 'Wed', incidents: 8 },
    { name: 'Thu', incidents: 12 },
    { name: 'Fri', incidents: 5 },
    { name: 'Sat', incidents: 2 },
    { name: 'Sun', incidents: 1 },
]

export function PatternDetection() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-purple-600 dark:text-purple-400" size={20} />
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Pattern Detection</h2>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full border border-orange-100 dark:border-orange-800">
                    <AlertTriangle size={12} />
                    Spike Detected
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717A' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#71717A' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="incidents"
                            stroke="#8884d8"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorIncidents)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    <strong>Insight:</strong> Urgent spike in "Database Connection" errors observed on Thursday. Correlates with deployment <span className="font-mono bg-zinc-200 dark:bg-zinc-700 px-1 rounded">v2.4.0</span>.
                </p>
            </div>
        </div>
    )
}
