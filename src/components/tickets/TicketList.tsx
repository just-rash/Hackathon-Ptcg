"use client"

import { useState, useRef, useMemo } from "react"
import { useDataset } from "@/context/DatasetContext"
import { Ticket } from "@/lib/types"
import { TicketCard } from "./TicketCard"

interface TicketListProps {
    onSelect?: (ticket: Ticket) => void
    selectedId?: string
}

const ITEM_HEIGHT = 160 // Approximate height of a TicketCard with margins

export function TicketList({ onSelect, selectedId }: TicketListProps) {
    const { tickets } = useDataset()
    const containerRef = useRef<HTMLDivElement>(null)
    const [scrollTop, setScrollTop] = useState(0)

    const visibleItems = useMemo(() => {
        const start = Math.floor(scrollTop / ITEM_HEIGHT)
        const end = Math.min(tickets.length, start + 15) // Render 15 items at a time
        return tickets.slice(start, end).map((ticket, index) => ({
            ticket,
            top: (start + index) * ITEM_HEIGHT
        }))
    }, [tickets, scrollTop])

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop)
    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-[calc(100vh-250px)] overflow-y-auto relative pr-2"
        >
            <div style={{ height: `${tickets.length * ITEM_HEIGHT}px`, position: 'relative' }}>
                {visibleItems.map(({ ticket, top }) => (
                    <div
                        key={ticket.id}
                        style={{
                            position: 'absolute',
                            top: `${top}px`,
                            left: 0,
                            right: 0,
                            height: `${ITEM_HEIGHT - 12}px` // Account for spacing
                        }}
                        className={selectedId === ticket.id ? "ring-2 ring-blue-500 rounded-xl" : ""}
                    >
                        <TicketCard
                            ticket={ticket}
                            onClick={onSelect}
                            isActive={selectedId === ticket.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
