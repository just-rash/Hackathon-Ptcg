"use client"

import { Search, Bell, User } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Avatar } from "@/components/ui/Avatar"

export function TopNav() {
    return (
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 transition-colors group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Search tickets, insights, or knowledge..."
                        className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all border border-transparent focus:bg-white dark:focus:bg-zinc-900 dark:text-zinc-100"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <AnimatedButton variant="ghost" size="icon" className="relative text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
                </AnimatedButton>

                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">John Doe</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">Admin</div>
                    </div>
                    <AnimatedButton variant="ghost" className="p-0 rounded-full h-auto hover:bg-transparent">
                        <Avatar fallback="JD" className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" />
                    </AnimatedButton>
                </div>
            </div>
        </header>
    )
}
