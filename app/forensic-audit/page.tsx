import { Sidebar } from "@/components/dashboard/sidebar"
import { GlobalFilter } from "@/components/dashboard/global-filter"
import { EmailThreadViewer } from "@/components/forensic/email-thread-viewer"
import { CoTReasoningPanel } from "@/components/forensic/cot-reasoning-panel"
import { SteeringMindmap } from "@/components/forensic/steering-mindmap"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Scale, FileText, AlertTriangle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ForensicAuditPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />

      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-mono font-bold neon-text-cyan animate-flicker">FORENSIC AUDIT</h1>
            <p className="text-sm font-mono text-slate-400 mt-1">
              Deep analysis of email communications for compliance violations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <NeonBadge variant="red" pulse>
              CASE: THREAD-2024-0892
            </NeonBadge>
            <Button className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <GlobalFilter />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Email Thread Viewer */}
          <EmailThreadViewer />

          {/* Chain of Thought Panel */}
          <CoTReasoningPanel />
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Steering Mindmap */}
          <div className="xl:col-span-2">
            <SteeringMindmap />
          </div>

          {/* Legal Summary */}
          <GlassCard variant="amber">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-amber-500/20">
              <Scale className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-mono font-semibold text-amber-300">Legal Summary</h2>
            </div>

            <div className="space-y-4">
              {/* Statutes Violated */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase mb-2">Statutes Potentially Violated</div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                    <code className="text-xs font-mono text-red-400">ORS 659A.421</code>
                    <p className="text-xs text-slate-400 mt-1">Source of Income Discrimination</p>
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                    <code className="text-xs font-mono text-amber-400">42 U.S.C. § 3604(b)</code>
                    <p className="text-xs text-slate-400 mt-1">Familial Status - Steering</p>
                  </div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                    <code className="text-xs font-mono text-amber-400">42 U.S.C. § 3604(a)</code>
                    <p className="text-xs text-slate-400 mt-1">Race - Geographic Steering</p>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase mb-2">Risk Assessment</div>
                <div className="flex items-center justify-between p-3 rounded bg-slate-800/50">
                  <span className="text-sm font-mono text-slate-300">Litigation Risk</span>
                  <span className="text-xl font-mono font-bold text-red-400">89/100</span>
                </div>
              </div>

              {/* Recommended Actions */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase mb-2">Immediate Actions</div>
                <ul className="space-y-2 text-xs font-mono">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-slate-300">Suspend agent pending investigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                    <span className="text-slate-300">Notify legal counsel immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-slate-300">Preserve all communication records</span>
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-lg bg-slate-900/50 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-mono font-semibold text-amber-300">Legal Disclaimer</p>
              <p className="text-xs font-mono text-slate-400 mt-1">
                This AI-generated analysis is for informational purposes only and does not constitute legal advice. The
                detection of potential violations is probabilistic and requires human review. Organizations should
                consult with qualified legal counsel before taking any action based on this report. FairGuard AI is a
                forensic tool to assist compliance teams, not a replacement for professional legal judgment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
