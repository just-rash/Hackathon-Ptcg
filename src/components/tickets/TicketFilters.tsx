"use client"

import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"

export function TicketFilters() {
    return (
        <div className="flex flex-col gap-4 p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Filter tickets..."
                    className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-zinc-200 dark:border-zinc-700 transition-all"
                />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 rounded-full whitespace-nowrap">
                    All Tickets
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors whitespace-nowrap">
                    My Assignees
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors whitespace-nowrap">
                    High Priority
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors whitespace-nowrap">
                    Unresolved
                </button>
                <button className="ml-auto p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <SlidersHorizontal size={16} />
                </button>
            </div>
        </div>
    )
}
