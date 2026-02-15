"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, FileText, CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDataset } from "@/context/DatasetContext"
import { useRouter } from "next/navigation"
import { uploadDataset, parseCSV } from "@/lib/api"

export default function EntryGateway() {
    const { uploadData } = useDataset()
    const router = useRouter()

    const [isDragging, setIsDragging] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [progress, setProgress] = useState("")

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelection(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelection(e.target.files[0])
        }
    }

    const handleFileSelection = async (selectedFile: File) => {
        setFile(selectedFile)
        setIsProcessing(true)
        setError(null)

        try {
            // Step 1: Parse CSV client-side
            setProgress("Reading file...")
            const csvText = await selectedFile.text()
            const csvRows = parseCSV(csvText)

            if (csvRows.length === 0) {
                throw new Error("CSV file appears to be empty or invalid")
            }

            // Step 2: Upload to backend for AI processing
            setProgress(`Analyzing ${csvRows.length} tickets with AI...`)
            const apiResponse = await uploadDataset(selectedFile)

            // Step 3: Store merged data in context
            setProgress("Finalizing results...")
            uploadData(selectedFile, apiResponse, csvRows)

            // Step 4: Navigate to dashboard
            setTimeout(() => {
                router.push("/")
            }, 500)

        } catch (err) {
            console.error("Upload failed:", err)
            let message = "Upload failed. Please try again."

            if (err instanceof TypeError && err.message.includes("fetch")) {
                message = "Cannot reach AI backend. Is the server running on port 8000?"
            } else if (err instanceof Error) {
                message = err.message
            }

            setError(message)
            setIsProcessing(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900">
            {/* Glassmorphism Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/50 dark:border-zinc-700/50 shadow-2xl rounded-3xl p-10 overflow-hidden relative"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
                            Welcome to ITSM AI
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                            Please upload your ticket dataset to initialize the AI analysis engine.
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {error ? (
                            <motion.div
                                key="error-state"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-8 flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                                    <AlertCircle size={32} className="text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Upload Failed
                                </h3>
                                <p className="text-sm text-red-500 dark:text-red-400 mb-6 max-w-sm">
                                    {error}
                                </p>
                                <button
                                    onClick={() => {
                                        setError(null)
                                        setFile(null)
                                        setIsProcessing(false)
                                    }}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                                >
                                    Try Again
                                </button>
                            </motion.div>
                        ) : !isProcessing ? (
                            <motion.div
                                key="upload-zone"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "border-2 border-dashed rounded-2xl p-10 transition-all duration-300 group cursor-pointer",
                                    isDragging
                                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[1.02]"
                                        : "border-zinc-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                                )}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                />
                                <div className="flex flex-col items-center gap-6">
                                    <div className={cn(
                                        "w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300",
                                        isDragging ? "bg-blue-100 text-blue-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-blue-500"
                                    )}>
                                        <UploadCloud size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">
                                            Drag & Drop Dataset
                                        </h3>
                                        <p className="text-sm text-zinc-500">
                                            Supported format: CSV
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                        className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                                    >
                                        Browse Files
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="processing-state"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 flex flex-col items-center"
                            >
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-full border-4 border-zinc-100 dark:border-zinc-800" />
                                    <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                                        <Loader2 size={24} className="animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Processing Dataset...
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm animate-pulse">
                                    {progress || `Analyzing: ${file?.name || "Unknown"}`}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
