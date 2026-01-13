"use client"

import * as React from "react"
import { Search, MapPin, Calendar, AlertTriangle, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { UploadModal } from "@/components/upload/upload-modal"

interface GlobalFilterProps {
  onFilterChange?: (filters: FilterState) => void
  onFilesUploaded?: (files: File[], source: string) => void
}

interface FilterState {
  propertyAddress: string
  dateRange: string
  riskLevel: string[]
}

export function GlobalFilter({ onFilterChange, onFilesUploaded }: GlobalFilterProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    propertyAddress: "",
    dateRange: "30d",
    riskLevel: [],
  })
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)

  const riskLevels = [
    { id: "critical", label: "CRITICAL", variant: "red" as const },
    { id: "high", label: "HIGH", variant: "amber" as const },
    { id: "medium", label: "MEDIUM", variant: "magenta" as const },
    { id: "low", label: "LOW", variant: "cyan" as const },
  ]

  const toggleRiskLevel = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      riskLevel: prev.riskLevel.includes(level)
        ? prev.riskLevel.filter((l) => l !== level)
        : [...prev.riskLevel, level],
    }))
  }

  const handleFileSelect = (files: File[], source: string) => {
    onFilesUploaded?.(files, source)
    setIsUploadOpen(false)
  }

  return (
    <>
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:bg-pink-500/30 font-mono cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            UPLOAD
          </Button>

          {/* Property Address Search */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <Input
                placeholder="Filter by property address or census tract..."
                value={filters.propertyAddress}
                onChange={(e) => setFilters((prev) => ({ ...prev, propertyAddress: e.target.value }))}
                className="pl-10 bg-slate-900/50 border-cyan-500/30 text-cyan-100 placeholder:text-slate-500 font-mono text-sm focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateRange: e.target.value }))}
              className="bg-slate-900/50 border border-cyan-500/30 rounded-md px-3 py-2 text-sm font-mono text-cyan-100 focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
          </div>

          {/* Risk Level Filters */}
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
            <div className="flex gap-2">
              {riskLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => toggleRiskLevel(level.id)}
                  className="transition-transform hover:scale-105 cursor-pointer"
                >
                  <NeonBadge
                    variant={level.variant}
                    className={filters.riskLevel.includes(level.id) ? "ring-2 ring-white/30" : "opacity-50"}
                  >
                    {level.label}
                  </NeonBadge>
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button
            onClick={() => onFilterChange?.(filters)}
            className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono cursor-pointer"
          >
            <Search className="w-4 h-4 mr-2" />
            SCAN
          </Button>
        </div>
      </GlassCard>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onFileSelect={handleFileSelect} />
    </>
  )
}
