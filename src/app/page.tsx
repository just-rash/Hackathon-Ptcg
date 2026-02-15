"use client"

import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { InsightActionGrid } from "@/components/dashboard/InsightActionGrid"
import { ProactiveInsights } from "@/components/insights/ProactiveInsights"
import { TicketVolumeChart, PriorityDistributionChart } from "@/components/dashboard/DashboardCharts"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
          >
            Overview
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-sm mt-1"
          >
            System-wide performance metrics and AI insights.
          </motion.p>
        </div>
        <div className="text-sm text-zinc-400 font-mono">
          Last updated: Just now
        </div>
      </div>

      {/* 1. AI Command Panel (High-Action Buttons) */}
      <InsightActionGrid />

      {/* 2. Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TicketVolumeChart />
        </div>
        <div className="lg:col-span-1">
          <PriorityDistributionChart />
        </div>
      </div>


    </div>
  )
}
