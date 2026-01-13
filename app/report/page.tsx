import { Sidebar } from "@/components/dashboard/sidebar"
import { ReportPreview } from "@/components/reports/report-preview"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Filter, RefreshCw } from "lucide-react"

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />

      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-mono font-bold neon-text-cyan animate-flicker">LEGAL REPORT GENERATOR</h1>
            <p className="text-sm font-mono text-slate-400 mt-1">
              Generate comprehensive legal briefs with statute citations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <NeonBadge variant="green">REPORT READY</NeonBadge>
          </div>
        </div>

        {/* Report Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <GlassCard className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-xs font-mono text-slate-400">Date Range</p>
              <p className="text-sm font-mono text-slate-200">Dec 15 - Jan 15</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-xs font-mono text-slate-400">Filter</p>
              <p className="text-sm font-mono text-slate-200">All Violations</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-xs font-mono text-slate-400">Format</p>
              <p className="text-sm font-mono text-slate-200">PDF + JSON</p>
            </div>
          </GlassCard>

          <Button className="h-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>

        {/* Report Preview */}
        <ReportPreview />
      </main>
    </div>
  )
}
