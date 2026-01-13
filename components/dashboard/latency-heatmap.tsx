"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LatencyCell {
  category: string
  day: string
  avgLatency: number
  sampleSize: number
}

// Mock data: Response latency by applicant category and day
const latencyData: LatencyCell[] = [
  // Standard applicants
  { category: "Standard", day: "Mon", avgLatency: 45, sampleSize: 42 },
  { category: "Standard", day: "Tue", avgLatency: 38, sampleSize: 51 },
  { category: "Standard", day: "Wed", avgLatency: 52, sampleSize: 48 },
  { category: "Standard", day: "Thu", avgLatency: 41, sampleSize: 55 },
  { category: "Standard", day: "Fri", avgLatency: 67, sampleSize: 38 },

  // Section 8 applicants
  { category: "Section 8", day: "Mon", avgLatency: 180, sampleSize: 12 },
  { category: "Section 8", day: "Tue", avgLatency: 245, sampleSize: 8 },
  { category: "Section 8", day: "Wed", avgLatency: 320, sampleSize: 15 },
  { category: "Section 8", day: "Thu", avgLatency: 195, sampleSize: 11 },
  { category: "Section 8", day: "Fri", avgLatency: 410, sampleSize: 9 },

  // Hispanic surnames (inferred)
  { category: "Hispanic (inf.)", day: "Mon", avgLatency: 95, sampleSize: 18 },
  { category: "Hispanic (inf.)", day: "Tue", avgLatency: 112, sampleSize: 22 },
  { category: "Hispanic (inf.)", day: "Wed", avgLatency: 88, sampleSize: 19 },
  { category: "Hispanic (inf.)", day: "Thu", avgLatency: 145, sampleSize: 24 },
  { category: "Hispanic (inf.)", day: "Fri", avgLatency: 168, sampleSize: 16 },

  // Asian surnames (inferred)
  { category: "Asian (inf.)", day: "Mon", avgLatency: 62, sampleSize: 14 },
  { category: "Asian (inf.)", day: "Tue", avgLatency: 55, sampleSize: 17 },
  { category: "Asian (inf.)", day: "Wed", avgLatency: 71, sampleSize: 12 },
  { category: "Asian (inf.)", day: "Thu", avgLatency: 48, sampleSize: 19 },
  { category: "Asian (inf.)", day: "Fri", avgLatency: 82, sampleSize: 11 },
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const categories = ["Standard", "Section 8", "Hispanic (inf.)", "Asian (inf.)"]

function getHeatColor(latency: number): string {
  if (latency < 60) return "bg-emerald-500/60"
  if (latency < 120) return "bg-cyan-500/60"
  if (latency < 180) return "bg-amber-500/60"
  if (latency < 300) return "bg-orange-500/60"
  return "bg-red-500/60"
}

function formatLatency(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function LatencyHeatmap() {
  const [selectedCell, setSelectedCell] = React.useState<LatencyCell | null>(null)

  const getCellData = (category: string, day: string) => {
    return latencyData.find((d) => d.category === category && d.day === day)
  }

  // Calculate category averages
  const categoryAverages = categories.map((cat) => {
    const catData = latencyData.filter((d) => d.category === cat)
    const avg = catData.reduce((sum, d) => sum + d.avgLatency, 0) / catData.length
    return { category: cat, avg: Math.round(avg) }
  })

  // Calculate bias indicator
  const standardAvg = categoryAverages.find((c) => c.category === "Standard")?.avg || 0
  const section8Avg = categoryAverages.find((c) => c.category === "Section 8")?.avg || 0
  const biasRatio = section8Avg / standardAvg

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-mono font-semibold text-cyan-300">Response Latency Analysis</h2>
        </div>

        {biasRatio > 2 && (
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-mono">Potential bias detected: {biasRatio.toFixed(1)}x latency ratio</span>
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Heatmap Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-6 gap-1">
            {/* Header row */}
            <div className="h-10" /> {/* Empty corner cell */}
            {days.map((day) => (
              <div key={day} className="h-10 flex items-center justify-center text-xs font-mono text-slate-400">
                {day}
              </div>
            ))}
            {/* Data rows */}
            {categories.map((category) => (
              <React.Fragment key={category}>
                <div className="h-12 flex items-center text-xs font-mono text-slate-300 pr-2">{category}</div>
                {days.map((day) => {
                  const cell = getCellData(category, day)
                  if (!cell) return <div key={day} className="h-12" />

                  return (
                    <div
                      key={day}
                      className={cn(
                        "h-12 rounded-md flex items-center justify-center cursor-pointer transition-all",
                        getHeatColor(cell.avgLatency),
                        selectedCell === cell && "ring-2 ring-white/50",
                        "hover:ring-1 hover:ring-cyan-400/50",
                      )}
                      onClick={() => setSelectedCell(cell)}
                    >
                      <span className="text-xs font-mono font-medium text-white">{formatLatency(cell.avgLatency)}</span>
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-slate-400">
            <span>Latency:</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-emerald-500/60" />
              <span>{"<1h"}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-cyan-500/60" />
              <span>1-2h</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-amber-500/60" />
              <span>2-3h</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-orange-500/60" />
              <span>3-5h</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-red-500/60" />
              <span>{">5h"}</span>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="w-64 space-y-4">
          <div className="text-xs font-mono text-slate-400 uppercase">Category Averages</div>
          {categoryAverages.map(({ category, avg }) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm font-mono text-slate-300">{category}</span>
              <span
                className={cn(
                  "text-sm font-mono font-medium",
                  avg < 60
                    ? "text-emerald-400"
                    : avg < 120
                      ? "text-cyan-400"
                      : avg < 180
                        ? "text-amber-400"
                        : "text-red-400",
                )}
              >
                {formatLatency(avg)}
              </span>
            </div>
          ))}

          {selectedCell && (
            <div className="mt-6 p-3 rounded-lg bg-slate-800/50 border border-cyan-500/20">
              <div className="text-xs font-mono text-slate-400 uppercase mb-2">Selected Cell</div>
              <div className="space-y-1 text-sm font-mono">
                <div className="text-cyan-300">
                  {selectedCell.category} - {selectedCell.day}
                </div>
                <div className="text-slate-300">Avg: {formatLatency(selectedCell.avgLatency)}</div>
                <div className="text-slate-400">Samples: {selectedCell.sampleSize}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
