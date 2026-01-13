"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { BarChart3, AlertTriangle, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DemographicData {
  category: string
  applications: number
  approvals: number
  rejections: number
  approvalRate: number
  avgResponseTime: number
  isProtected: boolean
  disparity?: number
}

const demographicData: DemographicData[] = [
  {
    category: "Standard Income",
    applications: 842,
    approvals: 714,
    rejections: 128,
    approvalRate: 84.8,
    avgResponseTime: 52,
    isProtected: false,
  },
  {
    category: "Section 8 Voucher",
    applications: 156,
    approvals: 89,
    rejections: 67,
    approvalRate: 57.1,
    avgResponseTime: 287,
    isProtected: true,
    disparity: -27.7,
  },
  {
    category: "Families w/ Children",
    applications: 324,
    approvals: 251,
    rejections: 73,
    approvalRate: 77.5,
    avgResponseTime: 68,
    isProtected: true,
    disparity: -7.3,
  },
  {
    category: "Single Adults",
    applications: 518,
    approvals: 452,
    rejections: 66,
    approvalRate: 87.3,
    avgResponseTime: 45,
    isProtected: false,
  },
  {
    category: "Disability Accommodation",
    applications: 89,
    approvals: 67,
    rejections: 22,
    approvalRate: 75.3,
    avgResponseTime: 94,
    isProtected: true,
    disparity: -9.5,
  },
]

export function DemographicImpact() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  // Calculate baseline (Standard Income)
  const baseline = demographicData.find((d) => d.category === "Standard Income")!

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-mono font-semibold text-cyan-300">Demographic Impact Analysis</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          Disparate Impact Indicators
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {demographicData.map((item) => {
          const isSelected = selectedCategory === item.category
          const hasDisparity = item.disparity && item.disparity < -5

          return (
            <div
              key={item.category}
              className={cn(
                "p-4 rounded-lg border transition-all cursor-pointer",
                item.isProtected ? "bg-pink-500/5 border-pink-500/20" : "bg-slate-800/30 border-slate-700/30",
                isSelected && "ring-1 ring-cyan-400/50",
                hasDisparity && "border-red-500/30",
              )}
              onClick={() => setSelectedCategory(isSelected ? null : item.category)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-slate-200">{item.category}</span>
                  {item.isProtected && (
                    <NeonBadge variant="magenta" className="text-[10px]">
                      PROTECTED
                    </NeonBadge>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {item.disparity && (
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-red-400" />
                      <span className="text-xs font-mono text-red-400">{item.disparity}%</span>
                    </div>
                  )}
                  <span className="text-sm font-mono text-slate-400">{item.applications} apps</span>
                </div>
              </div>

              {/* Approval Rate Bar */}
              <div className="relative h-6 rounded-full bg-slate-800 overflow-hidden">
                {/* Baseline reference line */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-cyan-400/50 z-10"
                  style={{ left: `${baseline.approvalRate}%` }}
                />

                {/* Approval bar */}
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    item.approvalRate >= baseline.approvalRate * 0.8
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                      : "bg-gradient-to-r from-red-500 to-amber-500",
                  )}
                  style={{ width: `${item.approvalRate}%` }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">
                    {item.approvalRate.toFixed(1)}% Approval Rate
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-cyan-400">{item.applications}</div>
                    <div className="text-[10px] font-mono text-slate-500">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-emerald-400">{item.approvals}</div>
                    <div className="text-[10px] font-mono text-slate-500">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold text-red-400">{item.rejections}</div>
                    <div className="text-[10px] font-mono text-slate-500">Rejected</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={cn(
                        "text-lg font-mono font-bold",
                        item.avgResponseTime > 100 ? "text-amber-400" : "text-slate-400",
                      )}
                    >
                      {item.avgResponseTime}m
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Avg Response</div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Disparity Alert */}
      <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <div>
            <p className="text-sm font-mono font-semibold text-red-300">Disparate Impact Detected</p>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Section 8 voucher holders show a 27.7% lower approval rate compared to standard income applicants. This
              exceeds the 4/5ths rule threshold and may indicate systemic discrimination under ORS 659A.421.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
