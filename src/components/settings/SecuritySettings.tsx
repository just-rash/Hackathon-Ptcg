"use client"

import { AnimatedButton } from "@/components/ui/AnimatedButton"
import { Shield, Smartphone, Key } from "lucide-react"

export function SecuritySettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Security</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your password and security settings.</p>
            </div>

            <div className="space-y-4 max-w-xl">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Key size={16} /> Password
                </h3>

                <div className="space-y-3">
                    <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="pt-2">
                    <AnimatedButton variant="primary">Update Password</AnimatedButton>
                </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            <div className="space-y-4 max-w-xl">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <Shield size={16} /> Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">Authenticator App</div>
                            <div className="text-xs text-zinc-500">Secure your account with 2FA</div>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

        </div>
    )
}
