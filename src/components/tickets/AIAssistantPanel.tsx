"use client"

import { Ticket } from "@/lib/types"
import { Bot, Sparkles, Files, ExternalLink, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"

interface AIAssistantPanelProps {
    ticket?: Ticket
}

export function AIAssistantPanel({ ticket }: AIAssistantPanelProps) {
    if (!ticket) return null

    return (
        <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 w-80 overflow-y-auto p-4 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                <Sparkles size={16} />
                <span>AI Copilot</span>
            </div>

            <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 text-sm flex items-center gap-2">
                        <Bot size={16} className="text-purple-500" />
                        Context Analysis
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        This ticket seems related to the recent <strong>v2.4.0 deployment</strong>. Multiple users are reporting similar latency issues in US-East.
                    </p>
                    <div className="mt-3 flex gap-2">
                        <button className="text-[10px] bg-zinc-100 dark:bg-zinc-700 hover:bg-green-100 dark:hover:bg-green-900/30 text-zinc-600 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                            <ThumbsUp size={10} /> Helpful
                        </button>
                        <button className="text-[10px] bg-zinc-100 dark:bg-zinc-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                            <ThumbsDown size={10} /> Not Helpful
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-2">
                        <Files size={16} className="text-blue-500" />
                        Similar Tickets
                    </h3>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-mono text-zinc-400">INC-2024-00{i}</span>
                                <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 rounded">Resolved</span>
                            </div>
                            <p className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                Latency spikes observed after load balancer update...
                            </p>
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-2">
                        <MessageSquare size={16} className="text-orange-500" />
                        Suggested Replies
                    </h3>
                    <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
                            "I'm investigating the load balancer latency in US-East. We suspect it's related to the recent deployment..."
                        </p>
                        <button className="mt-2 text-[10px] font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            Use this reply <ExternalLink size={10} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
