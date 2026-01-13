import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { GlobalFilter } from "@/components/dashboard/global-filter"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { ComplianceGauges } from "@/components/dashboard/compliance-gauges"
import { ViolationTable } from "@/components/dashboard/violation-table"
import { LatencyHeatmap } from "@/components/dashboard/latency-heatmap"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-64 mt-24 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-mono font-bold neon-text-cyan animate-flicker">COMMAND CENTER</h1>
          <p className="text-sm font-mono text-slate-400 mt-1">
            Real-time forensic analysis of property management communications
          </p>
        </div>

        {/* Global Filter */}
        <GlobalFilter />

        {/* Stats Grid */}
        <StatsGrid />

        {/* Compliance Gauges */}
        <ComplianceGauges />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Latency Heatmap */}
          <LatencyHeatmap />

          {/* Additional visualization placeholder */}
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-mono font-semibold text-cyan-300 mb-4">Violation Distribution by Type</h2>
            <div className="space-y-3">
              {[
                { type: "Source of Income", count: 0, pct: 0 },
                { type: "Steering", count: 0, pct: 0 },
                { type: "Familial Status", count: 0, pct: 0 },
                { type: "Disability", count: 0, pct: 0 },
                { type: "National Origin", count: 0, pct: 0 },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span className="text-slate-300">{item.type}</span>
                    <span className="text-cyan-400">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Violation Table */}
        <ViolationTable />

        {/* Footer */}
        <div className="mt-8 text-center text-xs font-mono text-slate-500 border-t border-cyan-500/10 pt-6">
          <p className="mb-2">
            HOUSING ACTIVISM PROJECT v2.1 | Tech 4 Liberation Alliance | Federal FHA + ORS 659A + Metro Code
          </p>
          <p className="text-amber-400/60">
            DISCLAIMER: AI-generated analysis. Not legal advice. Consult qualified counsel for compliance decisions.
          </p>
        </div>
      </main>
    </div>
  )
}
