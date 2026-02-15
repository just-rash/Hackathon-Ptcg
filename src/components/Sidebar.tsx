"use client"

import { Home, BarChart2, Settings, AlertTriangle, Menu, FileText, UploadCloud, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

const navItems = [
    { icon: Home, label: "Overview", href: "/" },
    { icon: FileText, label: "Tickets", href: "/tickets" },
    { icon: BarChart2, label: "Insights", href: "/insights" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    return (
        <>
            <motion.aside
                initial={{ width: 240 }}
                animate={{ width: isCollapsed ? 80 : 240 }}
                className="h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col relative z-20 shadow-xl"
            >
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full p-1 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors z-50 text-zinc-500"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                <div className={cn("p-6 flex items-center gap-3", isCollapsed && "justify-center px-2")}>
                    <div className="w-8 h-8 bg-black dark:bg-white rounded-lg shrink-0" />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100"
                        >
                            ITSM AI
                        </motion.span>
                    )}
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        // Improved active state logic
                        const isActive = item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href.split('?')[0])

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                                )}
                            >
                                <item.icon size={20} className={cn(isActive ? "text-white dark:text-zinc-900" : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-300")} />
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {item.label}
                                    </motion.span>
                                )}

                            </Link>
                        )
                    })}

                    <button
                        onClick={() => setIsUploadOpen(!isUploadOpen)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6",
                            isUploadOpen
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                        )}
                    >
                        <UploadCloud size={20} className={cn(isUploadOpen ? "text-blue-600" : "text-zinc-500 group-hover:text-zinc-900")} />
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                Upload Data
                            </motion.span>
                        )}
                    </button>
                </nav>

                {/* User Profile - Optional Footer */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        {!isCollapsed && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">Admin User</p>
                                <p className="text-xs text-zinc-500 truncate">admin@company.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Mini-Uploader Drawer */}
            <AnimatePresence>
                {isUploadOpen && (
                    <motion.div
                        initial={{ x: -320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -320, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-[240px] top-4 bottom-4 w-80 bg-white dark:bg-zinc-900 rounded-r-2xl border-y border-r border-zinc-200 dark:border-zinc-800 shadow-2xl z-30 p-6 flex flex-col"
                        style={{ marginLeft: isCollapsed ? -160 : 0 }} // Adjust for collapsed sidebar
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Quick Upload</h3>
                            <button onClick={() => setIsUploadOpen(false)} className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 hover:bg-zinc-200">
                                <X size={16} className="text-zinc-500" />
                            </button>
                        </div>
                        <p className="text-xs text-zinc-500 mb-6">Update your dataset without leaving the page.</p>

                        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer bg-zinc-50 dark:bg-zinc-800/50">
                            <UploadCloud size={32} className="text-zinc-400 mb-3" />
                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Drop file here</p>
                            <span className="text-xs text-zinc-400 mt-1">or click to browse</span>
                        </div>

                        <div className="mt-auto">
                            <button
                                onClick={() => router.push('/upload')}
                                className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-medium rounded-lg transition-colors"
                            >
                                Go to Full Upload Page
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
