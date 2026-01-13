import { Sidebar } from "@/components/dashboard/sidebar"
import { GlobalFilter } from "@/components/dashboard/global-filter"
import { CommunicationFlowchart } from "@/components/visualizations/communication-flowchart"
import { DemographicImpact } from "@/components/visualizations/demographic-impact"
import { LatencyHeatmap } from "@/components/dashboard/latency-heatmap"
import { GlassCard } from "@/components/ui/glass-card"
import { Clock, TrendingUp, AlertTriangle, Calendar } from "lucide-react"

export default function BiasTimelinePage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />

      <main className="ml-64 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-mono font-bold neon-text-cyan animate-flicker">BIAS TIMELINE</h1>
          <p className="text-sm font-mono text-slate-400 mt-1">
            Temporal analysis of communication patterns and disparate treatment indicators
          </p>
        </div>

        <GlobalFilter />

        {/* Timeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <GlassCard className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <Calendar className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-cyan-400">30</p>
              <p className="text-xs font-mono text-slate-400">Days Analyzed</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-pink-500/20">
              <Clock className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-pink-400">4.2x</p>
              <p className="text-xs font-mono text-slate-400">Latency Disparity</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-amber-400">-27.7%</p>
              <p className="text-xs font-mono text-slate-400">Approval Gap</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-red-400">HIGH</p>
              <p className="text-xs font-mono text-slate-400">Bias Risk Level</p>
            </div>
          </GlassCard>
        </div>

        {/* Main Visualizations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <CommunicationFlowchart />
          <DemographicImpact />
        </div>

        {/* Latency Analysis */}
        <LatencyHeatmap />

        {/* Methodology Note */}
        <div className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-cyan-500/20">
          <h3 className="text-sm font-mono font-semibold text-cyan-300 mb-2">Forensic Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
            <div>
              <p className="text-slate-300 mb-1">Response Latency Analysis</p>
              <p>
                Measures time-to-first-response for inquiries, segmented by protected class indicators. Significant
                disparities may indicate digital redlining.
              </p>
            </div>
            <div>
              <p className="text-slate-300 mb-1">Disparate Impact Calculation</p>
              <p>
                Uses the 4/5ths (80%) rule: if a protected class approval rate falls below 80% of the majority group,
                disparate impact is indicated.
              </p>
            </div>
            <div>
              <p className="text-slate-300 mb-1">Pattern Correlation</p>
              <p>
                Cross-references timing patterns with content analysis to identify systematic vs. isolated incidents of
                potential discrimination.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
