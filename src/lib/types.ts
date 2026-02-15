export type Priority = "low" | "medium" | "high" | "critical"
export type Status = "new" | "open" | "in-progress" | "resolved" | "closed"
export type SLARisk = "safe" | "at-risk" | "breached"

export interface Ticket {
    id: string
    title: string
    description: string
    priority: Priority
    status: Status
    slaRisk: SLARisk
    aiConfidence: number
    category: string
    createdAt: string
    assignee?: {
        name: string
        avatar?: string
    }
    clusterId?: number
}

// --- Backend API Types ---

export interface BackendTicket {
    "ticket id": string
    predicted_group: string
    routing_confidence: number
    duplicate_cluster_id: number
    predicted_resolution_time: number
    sla_limit: number
    risk_level: string
}

export interface Insights {
    top_recurring_clusters: Record<string, number>
    cluster_details: Record<string, {
        type: string
        size: number
        ticket_ids?: string[]
    }>
    team_workload: Record<string, number>
    risk_distribution: Record<string, number>
    daily_volume_trend: Record<string, number>
}

export interface DatasetResponse {
    tickets: BackendTicket[]
    insights: Insights
}

// Raw CSV row (all values are strings from CSV)
export interface CSVRow {
    [key: string]: string
}
