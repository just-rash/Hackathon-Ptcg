"use client"

import { ProfileSettings } from "@/components/settings/ProfileSettings"
import { AppearanceSettings } from "@/components/settings/AppearanceSettings"
import { SecuritySettings } from "@/components/settings/SecuritySettings"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'appearance', label: 'Appearance' },
        { id: 'security', label: 'Security' },
    ]

    return (
        <div className="space-y-6 pb-10">
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
                >
                    Settings
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-500 dark:text-zinc-400 text-sm mt-1"
                >
                    Manage your account settings and preferences.
                </motion.p>
            </div>

            <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "pb-4 text-sm font-medium transition-colors relative",
                            activeTab === tab.id
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                            />
                        )}
                    </button>
                ))}
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl"
            >
                {activeTab === 'profile' && <ProfileSettings />}
                {activeTab === 'appearance' && <AppearanceSettings />}
                {activeTab === 'security' && <SecuritySettings />}
            </motion.div>
        </div>
    )
}
