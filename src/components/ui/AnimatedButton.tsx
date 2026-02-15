"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { forwardRef } from "react"
import React from "react"

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"
    size?: "sm" | "md" | "lg" | "icon"
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    children?: React.ReactNode
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, leftIcon, rightIcon, disabled, ...props }, ref) => {

        const variants = {
            primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20",
            secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
            ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
            danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40",
            outline: "bg-transparent border border-zinc-200 dark:border-zinc-700 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
        }

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            icon: "h-10 w-10 p-0 flex items-center justify-center"
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={disabled || isLoading}
                className={cn(
                    "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none select-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </motion.button>
        )
    }
)

AnimatedButton.displayName = "AnimatedButton"
