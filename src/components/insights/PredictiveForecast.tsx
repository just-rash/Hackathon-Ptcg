"use client"

import { Zap } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const predictionData = [
    { day: 'Today', value: 45, isPredicted: false },
    { day: 'Tomorrow', value: 55, isPredicted: true },
    { day: 'Wed', value: 60, isPredicted: true },
    { day: 'Thu', value: 40, isPredicted: true },
    { day: 'Fri', value: 35, isPredicted: true },
]

export function PredictiveForecast() {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white h-full relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 opacity-90">
                    <Zap size={20} fill="currentColor" />
                    <h2 className="font-semibold text-lg">AI Forecast</h2>
                </div>
                <div className="mb-6 opacity-80 text-sm">
                    Predicted +15% incident volume over next 48h due to scheduled maintenance.
                </div>

                <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={predictionData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.7)' }}
                                interval={0}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '8px', border: 'none', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#fff"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium py-2 rounded-lg border border-white/10">
                        View Impact Analysis
                    </button>
                    <button className="flex-1 bg-white text-indigo-600 hover:bg-zinc-100 transition-colors text-xs font-bold py-2 rounded-lg">
                        Schedule Extra Staff
                    </button>
                </div>
            </div>

            {/* decorative background circles */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-purple-500/20 blur-xl" />
        </div>
    )
}
