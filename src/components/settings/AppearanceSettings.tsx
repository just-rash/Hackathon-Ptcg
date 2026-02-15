"use client"

import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Moon, Sun, Monitor, Type } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function AppearanceSettings() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
    const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Appearance</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Customize how the dashboard looks on your device.</p>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Theme Preference</label>
                <div className="grid grid-cols-3 gap-4 max-w-xl">
                    {[
                        { id: 'light', icon: Sun, label: 'Light' },
                        { id: 'dark', icon: Moon, label: 'Dark' },
                        { id: 'system', icon: Monitor, label: 'System' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setTheme(option.id as any)}
                            className={cn(
                                "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                theme === option.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                            )}
                        >
                            <option.icon size={24} />
                            <span className="text-sm font-medium">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Density Selection */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Content Density</label>
                <div className="flex items-center gap-4 max-w-xl p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    {[
                        { id: 'comfortable', label: 'Comfortable' },
                        { id: 'compact', label: 'Compact' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setDensity(option.id as any)}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                                density === option.id
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-zinc-500">
                    Compact mode reduces padding and font sizes to show more content on screen.
                </p>
            </div>

        </div>
    )
}
