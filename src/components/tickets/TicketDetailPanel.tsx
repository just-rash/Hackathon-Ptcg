"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { X, Shield, Send, Terminal, Hash, Activity, Clock, AlertCircle, User, Zap, Info } from "lucide-react"
import { Ticket } from "@/lib/types"
import { PriorityBadge } from "@/components/ui/PriorityBadge"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { cn } from "@/lib/utils"

interface TicketDetailPanelProps {
    ticket: Ticket | null
    onClose: () => void
}

export function TicketDetailPanel({ ticket, onClose }: TicketDetailPanelProps) {
    const [width, setWidth] = useState(600)
    const [isResizing, setIsResizing] = useState(false)

    const startResizing = useCallback(() => setIsResizing(true), [])
    const stopResizing = useCallback(() => setIsResizing(false), [])
    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - e.clientX
            if (newWidth > 400 && newWidth < 1200) {
                setWidth(newWidth)
            }
        }
    }, [isResizing])

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize)
            window.addEventListener("mouseup", stopResizing)
        }
        return () => {
            window.removeEventListener("mousemove", resize)
            window.removeEventListener("mouseup", stopResizing)
        }
    }, [isResizing, resize, stopResizing])

    if (!ticket) return null

    // Simulated data for fields not in the base Ticket type but requested by user
    const detailedData = {
        affectedUsers: Math.floor(Math.random() * 500) + 1,
        predictedResolutionTime: `${(Math.random() * 48).toFixed(1)} hours`,
        slaLimit: "24.0 hours",
        riskRatio: (Math.random() * 2 + 0.5).toFixed(2),
        predictionTimestamp: new Date(ticket.createdAt).toISOString().replace('T', ' ').split('.')[0] + " UTC",
        routingModelVersion: "routing_v1.0",
        slaModelVersion: "sla_v2.1",
        routingDecisionReason: `Semantic similarity to ${ticket.category.toLowerCase()}-related tickets + high impact score`,
        humanOverrideFlag: "false",
        overrideReason: "-"
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={onClose}
            />

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0, width: width }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 h-screen bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 flex flex-col"
            >
                {/* Drag Handle */}
                <div
                    className="absolute left-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-blue-400 transition-colors opacity-0 hover:opacity-100 z-50"
                    onMouseDown={startResizing}
                />

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <Terminal size={18} className="text-zinc-500" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                            Ticket Reference: {ticket.id}
                        </h2>
                    </div>
                    <AnimatedButton variant="ghost" size="icon" onClick={onClose}>
                        <X size={20} />
                    </AnimatedButton>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
                                {ticket.title}
                            </h1>
                            <div className="flex flex-wrap gap-3">
                                <PriorityBadge priority={ticket.priority} slaRisk={ticket.slaRisk} />
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 uppercase tracking-wider">
                                    <Hash size={12} />
                                    Cluster ID: {ticket.clusterId ?? "N/A"}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Description</h4>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                {ticket.description}
                            </p>
                        </div>
                    </div>

                    {/* Technical Analysis Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DataCard label="Ticket ID" value={ticket.id} icon={Terminal} />
                        <DataCard label="Original Priority" value={ticket.priority} icon={Activity} highlight />
                        <DataCard label="Affected Users" value={detailedData.affectedUsers} icon={User} />
                        <DataCard label="Predicted Group" value={ticket.assignee?.name || "Unassigned"} icon={Shield} />
                        <DataCard label="Routing Confidence" value={`${(ticket.aiConfidence / 100).toFixed(2)}`} icon={Zap} />
                        <DataCard label="Duplicate Cluster ID" value={ticket.clusterId ?? "None"} icon={Hash} />
                        <DataCard label="Predicted Resolution Time" value={detailedData.predictedResolutionTime} icon={Clock} />
                        <DataCard label="SLA Limit" value={detailedData.slaLimit} icon={AlertCircle} />
                        <DataCard label="Risk Ratio" value={detailedData.riskRatio} icon={Activity} />
                        <DataCard label="Risk Level" value={ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} icon={Shield} highlight />
                    </div>

                    {/* Metadata & Model Info */}
                    <div className="space-y-4">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                                <Info size={16} className="text-blue-500" />
                                AI Prediction Metadata
                            </h3>
                            <div className="space-y-3">
                                <MetaField label="Prediction Timestamp" value={detailedData.predictionTimestamp} />
                                <MetaField label="Routing Model Version" value={detailedData.routingModelVersion} />
                                <MetaField label="SLA Model Version" value={detailedData.slaModelVersion} />
                                <div className="pt-2">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Routing Decision Reason</span>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
                                        "{detailedData.routingDecisionReason}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Human Override Flag</span>
                                <span className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{detailedData.humanOverrideFlag}</span>
                            </div>
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Override Reason</span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">{detailedData.overrideReason}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="relative">
                        <textarea
                            placeholder="Add persistent note or routing override reason..."
                            className="w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl p-3 pr-12 min-h-[44px] max-h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                        />
                        <button className="absolute right-2 bottom-2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

function DataCard({ label, value, icon: Icon, highlight }: { label: string, value: string | number, icon: any, highlight?: boolean }) {
    return (
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm group hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2 font-bold text-zinc-400 dark:text-zinc-500">
                <Icon size={14} className="group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] uppercase tracking-widest">{label}</span>
            </div>
            <p className={cn(
                "text-lg font-bold font-mono tracking-tight",
                highlight ? "text-blue-600 dark:text-blue-400" : "text-zinc-900 dark:text-zinc-100"
            )}>
                {value}
            </p>
        </div>
    )
}

function MetaField({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
            <span className="text-xs text-zinc-500">{label}</span>
            <span className="text-xs font-mono text-zinc-900 dark:text-zinc-100">{value}</span>
        </div>
    )
}

function getRelativeTime(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
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
