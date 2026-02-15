"use client"

import { TicketCard } from "@/components/tickets/TicketCard"
import { Ticket } from "@/lib/types"
import { motion } from "framer-motion"

interface TicketBoardProps {
    tickets: Ticket[]
    onSelectTicket: (ticket: Ticket) => void
    selectedTicketId?: string
}

export function TicketBoard({ tickets, onSelectTicket, selectedTicketId }: TicketBoardProps) {
    const highPriority = tickets.filter(t => t.priority === 'high' || t.priority === 'critical')
    const unresolved = tickets.filter(t => t.status !== 'resolved' && t.priority !== 'high' && t.priority !== 'critical')
    const myAssigned = tickets.filter(t => t.assignee?.name === 'John Doe') // Mock current user

    const columns = [
        { title: "High Priority", data: highPriority, color: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20" },
        { title: "Unresolved", data: unresolved, color: "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800" },
        { title: "My Assigned", data: myAssigned, color: "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20" },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
            {columns.map((col) => (
                <div key={col.title} className={`flex flex-col h-full rounded-2xl border ${col.color} p-4`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{col.title}</h3>
                        <span className="text-xs font-mono bg-white dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 text-zinc-500">
                            {col.data.length}
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {col.data.map((ticket) => (
                            <div key={ticket.id} onClick={() => onSelectTicket(ticket)}>
                                <TicketCard
                                    ticket={ticket}
                                    isActive={selectedTicketId === ticket.id}
                                />
                            </div>
                        ))}
                        {col.data.length === 0 && (
                            <div className="h-32 flex items-center justify-center text-zinc-400 text-sm border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                                No tickets
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
