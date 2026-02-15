"use client"

import { cn } from "@/lib/utils"
import { AlertCircle, Clock, CheckCircle } from "lucide-react"

type Priority = "low" | "medium" | "high" | "critical"
type SLARisk = "safe" | "at-risk" | "breached"

interface PriorityBadgeProps {
    priority: Priority
    slaRisk?: SLARisk
}

export function PriorityBadge({ priority, slaRisk = "safe" }: PriorityBadgeProps) {
    const priorityColors = {
        low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
        high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
        critical: "bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-200 border-red-300 dark:border-red-700 font-bold",
    }

    const slaColors = {
        safe: "text-green-600 dark:text-green-400",
        "at-risk": "text-yellow-600 dark:text-yellow-400",
        breached: "text-red-600 dark:text-red-400",
    }

    const SlaIcon = slaRisk === "safe" ? CheckCircle : slaRisk === "at-risk" ? Clock : AlertCircle

    return (
        <div className="flex items-center gap-2">
            <span className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wide",
                priorityColors[priority]
            )}>
                {priority}
            </span>

            {slaRisk !== "safe" && (
                <div className={cn("flex items-center gap-1 text-xs font-medium", slaColors[slaRisk])}>
                    <SlaIcon size={14} />
                    {slaRisk === "at-risk" ? "SLA Warning" : "SLA Breached"}
                </div>
            )}
        </div>
    )
}
