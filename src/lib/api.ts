import { DatasetResponse } from "./types"

const API_BASE = "/api"

export async function uploadDataset(file: File): Promise<DatasetResponse> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE}/upload-dataset`, {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload failed (${response.status}): ${errorText}`)
    }

    return response.json()
}

/**
 * Parse a CSV string into an array of row objects.
 * Uses the first row as headers.
 */
export function parseCSV(csvText: string): Record<string, string>[] {
    const lines = csvText.trim().split("\n")
    if (lines.length < 2) return []

    const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""))

    return lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""))
        const row: Record<string, string> = {}
        headers.forEach((header, i) => {
            row[header] = values[i] || ""
        })
        return row
    })
}
