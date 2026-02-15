"use client"

import { Ticket } from "@/lib/types"
import { PriorityBadge } from "@/components/ui/PriorityBadge"
import { Avatar } from "@/components/ui/Avatar"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Send, Paperclip, MoreHorizontal, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TicketDetailProps {
    ticket?: Ticket
}

export function TicketDetail({ ticket }: TicketDetailProps) {
    const [reply, setReply] = useState("")

    if (!ticket) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 bg-white dark:bg-zinc-950">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h10" /><path d="M7 11h10" /><path d="M7 15h10" /></svg>
                </div>
                <p>Select a ticket to view details</p>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start bg-white dark:bg-zinc-950">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">#{ticket.id}</span>
                        <PriorityBadge priority={ticket.priority} slaRisk={ticket.slaRisk} />
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                            <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'resolved' ? 'bg-green-500' : 'bg-blue-500'}`} />
                            {ticket.status}
                        </span>
                    </div>
                    <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{ticket.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1"><Clock size={14} /> Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{ticket.category}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <AnimatedButton variant="ghost" size="icon" className="rounded-lg text-zinc-500">
                        <MoreHorizontal size={20} />
                    </AnimatedButton>
                    <AnimatedButton
                        variant="primary"
                        leftIcon={<CheckCircle size={16} />}
                        className="shadow-blue-500/20"
                    >
                        Resolve
                    </AnimatedButton>
                </div>
            </div>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/50 dark:bg-zinc-900/50">
                {/* User Message */}
                <div className="flex gap-4">
                    <Avatar fallback="JD" className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">John Doe</span>
                            <span className="text-xs text-zinc-500">2h ago</span>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-zinc-700 dark:text-zinc-300">
                            <p>{ticket.description}</p>
                        </div>
                    </div>
                </div>

                {/* Agent Reply (Mock) */}
                {ticket.status !== 'new' && (
                    <div className="flex gap-4 flex-row-reverse">
                        <Avatar fallback="AI" className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between flex-row-reverse">
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">ITSM Copilot <Sparkles size={12} className="text-purple-500" /></span>
                                <span className="text-xs text-zinc-500">1h ago</span>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 p-3 rounded-lg rounded-tr-none shadow-sm text-sm text-zinc-700 dark:text-zinc-300">
                                <p>I've detected this as a potential infrastructure issue related to the US-East cluster. I've automatically prioritized this ticket and notified the SRE team.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Reply Box */}
            <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
                <div className="relative">
                    <textarea
                        placeholder="Type your reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full min-h-[100px] p-3 pr-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 md:text-sm resize-none transition-shadow"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <AnimatedButton variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                            <Paperclip size={18} />
                        </AnimatedButton>
                        <AnimatedButton
                            variant="primary"
                            size="icon"
                            disabled={!reply.trim()}
                            className={cn("transition-all duration-200", !reply.trim() && "opacity-50 grayscale")}
                        >
                            <Send size={16} />
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Sparkles({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    )
}
