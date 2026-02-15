"use client"

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Ticket, DatasetResponse, Insights, Priority, SLARisk } from "@/lib/types"

interface DatasetContextType {
    isUploaded: boolean
    isLoading: boolean
    error: string | null
    fileName: string | null
    tickets: Ticket[]
    insights: Insights | null
    updateTicketStatus: (ticketId: string, status: "open" | "resolved") => void
    uploadData: (file: File, apiResponse: DatasetResponse, csvRows: Record<string, string>[]) => void
    clearData: () => void
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined)

function mapRiskToSla(riskLevel: string): SLARisk {
    switch (riskLevel) {
        case "Critical":
        case "High":
            return "breached"
        case "Medium":
            return "at-risk"
        default:
            return "safe"
    }
}

function normalizePriority(value: string): Priority {
    const lower = (value || "").toLowerCase().trim()
    if (lower === "critical" || lower === "p1" || lower === "1") return "critical"
    if (lower === "high" || lower === "p2" || lower === "2") return "high"
    if (lower === "medium" || lower === "p3" || lower === "3") return "medium"
    return "low"
}

function mergeData(
    apiResponse: DatasetResponse,
    csvRows: Record<string, string>[]
): Ticket[] {
    const predictionMap = new Map(
        apiResponse.tickets.map(t => [String(t["ticket id"]).trim(), t])
    )

    return csvRows.map((row, index) => {
        const keys = Object.keys(row)
        const ticketIdKey = keys.find(k => k.toLowerCase().includes("ticket")) || keys[0]
        const ticketId = (row[ticketIdKey] || `TICKET-${index + 1}`).trim()
        const prediction = predictionMap.get(ticketId)

        const description = row["description"] || row["Description"] || ""
        const priority = normalizePriority(row["priority"] || row["Priority"] || "medium")

        const title = description.length > 60
            ? description.substring(0, 60) + "..."
            : description || `Ticket ${ticketId}`

        return {
            id: ticketId,
            title,
            description,
            priority,
            status: "open" as const,
            slaRisk: prediction ? mapRiskToSla(prediction.risk_level) : "safe" as SLARisk,
            aiConfidence: prediction ? Math.round(prediction.routing_confidence * 100) : 0,
            category: row["category"] || row["Category"] || row["source"] || "General",
            createdAt: row["created_at"] || row["Date"] || new Date().toISOString(),
            assignee: prediction
                ? { name: prediction.predicted_group }
                : undefined,
            clusterId: prediction?.duplicate_cluster_id
        }
    })
}

export function DatasetProvider({ children }: { children: ReactNode }) {
    const [isUploaded, setIsUploaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [apiInsights, setApiInsights] = useState<Insights | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!isUploaded && pathname !== "/upload") {
            router.push("/upload")
        }
    }, [isUploaded, pathname, router])

    const insights = useMemo(() => {
        if (!apiInsights || tickets.length === 0) return apiInsights

        const openTickets = tickets.filter(t => t.status !== "resolved")
        const dailyTrend: Record<string, number> = {}
        const teamLoad: Record<string, number> = {}
        const riskDist: Record<string, number> = {}
        const recurringClusters: Record<string, number> = {}

        // Handle daily volume trend from open tickets
        openTickets.forEach(t => {
            const date = t.createdAt.split('T')[0]
            dailyTrend[date] = (dailyTrend[date] || 0) + 1
            if (t.assignee) {
                teamLoad[t.assignee.name] = (teamLoad[t.assignee.name] || 0) + 1
            }
            const riskLabel = t.priority === "critical" ? "Critical" : t.priority === "high" ? "High" : t.priority === "medium" ? "Medium" : "Low"
            riskDist[riskLabel] = (riskDist[riskLabel] || 0) + 1

            if (t.clusterId !== undefined && t.clusterId !== -1) {
                const cId = String(t.clusterId)
                recurringClusters[cId] = (recurringClusters[cId] || 0) + 1
            }
        })

        return {
            ...apiInsights,
            daily_volume_trend: dailyTrend,
            team_workload: teamLoad,
            risk_distribution: riskDist,
            top_recurring_clusters: recurringClusters
        }
    }, [apiInsights, tickets])

    const uploadData = (
        file: File,
        apiResponse: DatasetResponse,
        csvRows: Record<string, string>[]
    ) => {
        const mergedTickets = mergeData(apiResponse, csvRows)
        setTickets(mergedTickets)
        setApiInsights(apiResponse.insights)
        setIsUploaded(true)
        setFileName(file.name)
        setError(null)
    }

    const updateTicketStatus = (ticketId: string, status: "open" | "resolved") => {
        setTickets(prev => prev.map(t =>
            t.id === ticketId ? { ...t, status } : t
        ))
    }

    const clearData = () => {
        setIsUploaded(false)
        setFileName(null)
        setTickets([])
        setApiInsights(null)
        setError(null)
        router.push("/upload")
    }

    return (
        <DatasetContext.Provider value={{
            isUploaded,
            isLoading,
            error,
            fileName,
            tickets,
            insights,
            updateTicketStatus,
            uploadData,
            clearData
        }}>
            {children}
        </DatasetContext.Provider>
    )
}

export function useDataset() {
    const context = useContext(DatasetContext)
    if (context === undefined) {
        throw new Error("useDataset must be used within a DatasetProvider")
    }
    return context
}
