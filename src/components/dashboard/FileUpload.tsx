"use client"

import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function FileUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0]
            handleFile(droppedFile)
        }
    }, [])

    const handleFile = (file: File) => {
        setFile(file)
        setUploadStatus('uploading')
        // Simulate upload
        setTimeout(() => {
            setUploadStatus('success')
        }, 1500)
    }

    return (
        <div className="w-full">
            <motion.div
                layout
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center gap-4 cursor-pointer",
                    isDragging
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                        : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600",
                    uploadStatus === 'success' && "border-green-500 bg-green-50 dark:bg-green-900/10"
                )}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFile(e.target.files[0])
                        }
                    }}
                />

                <AnimatePresence mode="wait">
                    {uploadStatus === 'idle' || uploadStatus === 'uploading' ? (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-2 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-zinc-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    CSV, JSON, or Excel files (max 10MB)
                                </p>
                            </div>
                        </motion.div>
                    ) : uploadStatus === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-2 text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {file?.name} uploaded successfully!
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setFile(null)
                                    setUploadStatus('idle')
                                }}
                                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline z-10"
                            >
                                Upload another
                            </button>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                            <p>Error uploading file</p>
                        </div>
                    )}
                </AnimatePresence>

                {uploadStatus === 'uploading' && (
                    <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5 }}
                    />
                )}
            </motion.div>
        </div>
    )
}
