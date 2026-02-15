"use client"

import { Users, Star } from "lucide-react"

const resolvers = [
    { name: "Sarah Connor", department: "SRE", resolved: 142, avgTime: "2h 15m", rating: 4.9 },
    { name: "John Wick", department: "Security", resolved: 89, avgTime: "1h 45m", rating: 4.8 },
    { name: "Ripley", department: "Ops", resolved: 115, avgTime: "3h 10m", rating: 4.7 },
    { name: "Neo", department: "Development", resolved: 76, avgTime: "4h 20m", rating: 4.9 },
    { name: "Trinity", department: "Network", resolved: 98, avgTime: "2h 50m", rating: 4.6 },
]

export function ResolverPerformance() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Users className="text-purple-600 dark:text-purple-400" size={20} />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Top Resolvers</h2>
            </div>

            <div className="space-y-4">
                {resolvers.map((resolver, index) => (
                    <div key={resolver.name} className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-600 dark:text-zinc-300">
                                {resolver.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{resolver.name}</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">{resolver.department}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                                <div className="font-semibold text-zinc-900 dark:text-zinc-100">{resolver.resolved}</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Tickets</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-zinc-900 dark:text-zinc-100">{resolver.avgTime}</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Avg Time</div>
                            </div>
                            <div className="flex items-center gap-1 font-semibold text-yellow-600 dark:text-yellow-400">
                                {resolver.rating} <Star size={12} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
