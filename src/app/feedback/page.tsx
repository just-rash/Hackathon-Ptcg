"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, TrendingUp, Activity, HelpCircle, ArrowRight } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { cn } from "@/lib/utils"

const accuracyData = [
    { day: "Mon", accuracy: 82 },
    { day: "Tue", accuracy: 85 },
    { day: "Wed", accuracy: 84 },
    { day: "Thu", accuracy: 88 },
    { day: "Fri", accuracy: 91 },
    { day: "Sat", accuracy: 90 },
    { day: "Sun", accuracy: 93 },
]

const recentCorrections = [
    { id: "INC-1024", original: "Network Issue", corrected: "Hardware Failure", user: "John Doe", time: "2h ago" },
    { id: "INC-1029", original: "Software Access", corrected: "Security Breach", user: "Alice Smith", time: "5h ago" },
    { id: "INC-1033", original: "Password Reset", corrected: "Account Locked", user: "Bob Johnson", time: "1d ago" },
    { id: "INC-1045", original: "Hardware", corrected: "Peripheral Issue", user: "John Doe", time: "1d ago" },
]

export default function FeedbackLoopPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">AI Feedback Loop</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" />
                    AI continuously learns from human corrections to improve classification and routing accuracy.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp size={64} />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Current Accuracy Rate</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">93.4%</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">+2.1% <TrendingUp size={12} className="ml-1" /></span>
                    </div>
                    <div className="mt-4 h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[93.4%]" />
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Total Corrections (This Week)</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">142</span>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center">-12% vs last week</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4">Fewer corrections indicate better initial AI performance.</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Learning Status</h3>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            Active Learning <Activity size={20} className="animate-pulse" />
                        </span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            Next model retraining scheduled in <strong>4 hours</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Model Improvement Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#71717a' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#71717a' }}
                                    domain={[70, 100]}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="accuracy"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorAccuracy)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Corrections List */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Corrections</h3>
                        <AnimatedButton variant="ghost" size="sm" className="text-xs">View All</AnimatedButton>
                    </div>
                    <div className="space-y-4">
                        {recentCorrections.map((item) => (
                            <div key={item.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-mono text-xs text-zinc-500">{item.id}</span>
                                    <span className="text-xs text-zinc-400">{item.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm mb-1">
                                    <span className="text-red-500 line-through decoration-red-500/50 decoration-2">{item.original}</span>
                                    <ArrowRight size={14} className="text-zinc-300" />
                                    <span className="text-green-600 font-medium">{item.corrected}</span>
                                </div>
                                <p className="text-xs text-zinc-400 mt-2">Corrected by {item.user}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-xs text-zinc-500">
                            These corrections are pending review before being added to the training set.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
