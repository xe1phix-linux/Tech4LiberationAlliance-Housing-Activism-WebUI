"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { CyberGauge } from "@/components/ui/cyber-gauge"
import { Scale } from "lucide-react"

export function ComplianceGauges() {
  return (
    <GlassCard className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg font-mono font-semibold text-cyan-300">Jurisdiction Compliance Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Federal FHA Compliance */}
        <div className="text-center">
          <CyberGauge value={94} label="Federal FHA" sublabel="42 U.S.C. § 3604" variant="cyan" size="md" />
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Race/Color</span>
              <span className="text-emerald-400">98%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Familial Status</span>
              <span className="text-amber-400">87%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Disability</span>
              <span className="text-emerald-400">96%</span>
            </div>
          </div>
        </div>

        {/* Oregon State Compliance */}
        <div className="text-center">
          <CyberGauge
            value={89}
            label="Oregon ORS 659A"
            sublabel="State Protected Classes"
            variant="magenta"
            size="md"
          />
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Source of Income</span>
              <span className="text-amber-400">82%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Sexual Orientation</span>
              <span className="text-emerald-400">95%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Marital Status</span>
              <span className="text-emerald-400">91%</span>
            </div>
          </div>
        </div>

        {/* Washington County Local */}
        <div className="text-center">
          <CyberGauge value={91} label="Metro Code" sublabel="Washington County" variant="gradient" size="md" />
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Criminal History</span>
              <span className="text-emerald-400">93%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Credit Screening</span>
              <span className="text-amber-400">88%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Barrier Reduction</span>
              <span className="text-emerald-400">92%</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
