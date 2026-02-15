"use client"

import { Ticket } from "@/lib/types"
import { PriorityBadge } from "@/components/ui/PriorityBadge"
import { cn } from "@/lib/utils"
import { Clock, User, CheckCircle, ArrowUpRight } from "lucide-react"
import { useDataset } from "@/context/DatasetContext"

interface TicketCardProps {
    ticket: Ticket
    isActive?: boolean
    onClick?: (ticket: Ticket) => void
}

export function TicketCard({ ticket, isActive, onClick }: TicketCardProps) {
    const { updateTicketStatus } = useDataset()
    const timeAgo = getRelativeTime(ticket.createdAt)

    return (
        <div
            onClick={() => onClick?.(ticket)}
            className={cn(
                "group relative p-4 rounded-xl border cursor-pointer transition-all duration-200",
                "bg-white dark:bg-zinc-900 hover:shadow-md",
                isActive
                    ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            )}
        >
            {/* Top Row: ID + Priority + Actions */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        #{ticket.id}
                    </span>
                    {ticket.status === "resolved" && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                            <CheckCircle size={10} />
                            RESOLVED
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {ticket.status !== "resolved" && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                updateTicketStatus(ticket.id, "resolved")
                            }}
                            className="p-1 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 text-zinc-400 hover:text-green-600 transition-colors"
                            title="Mark as Resolved"
                        >
                            <CheckCircle size={16} />
                        </button>
                    )}
                    <PriorityBadge priority={ticket.priority} slaRisk={ticket.slaRisk} />
                </div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {ticket.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
                {ticket.description}
            </p>

            {/* Bottom Row: Meta */}
            <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center gap-3">
                    {/* Status Indicator */}
                    <span className="flex items-center gap-1.5 capitalize">
                        <div
                            className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                ticket.status === "resolved" || ticket.status === "closed"
                                    ? "bg-green-500"
                                    : ticket.status === "in-progress"
                                        ? "bg-blue-500"
                                        : ticket.status === "open"
                                            ? "bg-amber-500"
                                            : "bg-zinc-400"
                            )}
                        />
                        {ticket.status}
                    </span>

                    {/* Category */}
                    <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                        {ticket.category}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Assignee */}
                    {ticket.assignee && (
                        <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                            <User size={12} />
                            {ticket.assignee.name}
                        </span>
                    )}

                    {/* Time */}
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {timeAgo}
                    </span>
                </div>
            </div>

            {/* AI Confidence Indicator */}
            {ticket.aiConfidence > 0 && (
                <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                            AI Confidence
                        </span>
                        <span
                            className={cn(
                                "text-[10px] font-bold",
                                ticket.aiConfidence >= 90
                                    ? "text-green-600 dark:text-green-400"
                                    : ticket.aiConfidence >= 70
                                        ? "text-amber-600 dark:text-amber-400"
                                        : "text-red-600 dark:text-red-400"
                            )}
                        >
                            {ticket.aiConfidence}%
                        </span>
                    </div>
                    <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-500",
                                ticket.aiConfidence >= 90
                                    ? "bg-green-500"
                                    : ticket.aiConfidence >= 70
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                            )}
                            style={{ width: `${ticket.aiConfidence}%` }}
                        />
                    </div>
                </div>
            )}
            {/* SLA Risk Widget */}
            <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                        SLA Risk
                    </span>
                    <span
                        className={cn(
                            "text-[10px] font-bold uppercase",
                            ticket.slaRisk === "breached"
                                ? "text-red-600 dark:text-red-400"
                                : ticket.slaRisk === "at-risk"
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-green-600 dark:text-green-400"
                        )}
                    >
                        {ticket.slaRisk === "breached" ? "Breached" : ticket.slaRisk === "at-risk" ? "At Risk" : "Safe"}
                    </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-700",
                            ticket.slaRisk === "breached"
                                ? "bg-red-500"
                                : ticket.slaRisk === "at-risk"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                        )}
                        style={{
                            width: ticket.slaRisk === "breached" ? "100%" : ticket.slaRisk === "at-risk" ? "70%" : "30%"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

function getRelativeTime(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Unknown"
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHrs = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHrs / 24)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHrs < 24) return `${diffHrs}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
}
