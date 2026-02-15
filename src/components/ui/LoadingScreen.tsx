"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const loadingTexts = [
    "Initializing AI modules...",
    "Analyzing historical ticket data...",
    "Training classification model...",
    "Preparing smart routing engine...",
]

export function LoadingScreen() {
    const [textIndex, setTextIndex] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length)
        }, 2000)

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + 1
            })
        }, 80) // Total time approx 8 seconds

        return () => {
            clearInterval(textInterval)
            clearInterval(progressInterval)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950">
            <div className="w-full max-w-md px-6 text-center space-y-8">
                {/* Logo Placeholder */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-white"
                    >
                        <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10Z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                </motion.div>

                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        AI Intelligent Ticketing System
                    </h1>
                    <div className="h-6 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={textIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm text-zinc-500 dark:text-zinc-400 font-medium absolute w-full left-0 right-0"
                            >
                                {loadingTexts[textIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-600"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 font-mono">
                        <span>PROCESSING</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
