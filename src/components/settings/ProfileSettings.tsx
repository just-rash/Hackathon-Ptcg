"use client"

import { useState } from "react"
import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Avatar } from "@/components/ui/Avatar"
import { User, Mail, Briefcase, Camera } from "lucide-react"

export function ProfileSettings() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Profile Information</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Update your account's public information.</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                    <Avatar
                        fallback="JD"
                        className="w-24 h-24 text-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" />
                    </div>
                </div>
                <div>
                    <AnimatedButton variant="secondary" size="sm">Change Avatar</AnimatedButton>
                    <p className="text-xs text-zinc-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
            </div>

            <div className="grid gap-4 max-w-xl">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <User size={16} /> Full Name
                    </label>
                    <input
                        type="text"
                        defaultValue="John Doe"
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <Mail size={16} /> Email Address
                    </label>
                    <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <Briefcase size={16} /> Role
                    </label>
                    <input
                        type="text"
                        defaultValue="Administrator"
                        disabled
                        className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="pt-4">
                <AnimatedButton onClick={handleSave} isLoading={isLoading}>
                    Save Changes
                </AnimatedButton>
            </div>
        </div>
    )
}
