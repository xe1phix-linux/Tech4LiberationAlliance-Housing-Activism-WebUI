"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Download,
  Copy,
  ChevronDown,
  ChevronRight,
  Scale,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type LegalExpertBrief, LEGAL_DISCLAIMER } from "@/lib/report-generator"

// Mock data for demo
const mockBrief: LegalExpertBrief = {
  metadata: {
    reportId: "FGAI-1705345678901",
    generatedAt: "2024-01-15T18:00:00Z",
    generatedBy: "FairGuard AI v2.1",
    version: "2.1.0",
    jurisdiction: {
      federal: true,
      state: "Oregon",
      county: "Washington County",
    },
  },
  executiveSummary: {
    totalViolations: 5,
    criticalCount: 2,
    highCount: 2,
    mediumCount: 1,
    lowCount: 0,
    overallRiskScore: 89,
    primaryConcerns: [
      "Source of Income discrimination (ORS 659A.421): 2 instances",
      "Geographic steering indicators: 2 instances",
      "Response latency bias (digital redlining): 1 instance",
    ],
  },
  violations: [
    {
      violationId: "VIO-2024-001",
      timestamp: "2024-01-15T16:42:00Z",
      severity: "critical",
      statuteViolated: {
        code: "ORS 659A.421",
        title: "Oregon Unlawful Discrimination - Source of Income",
        fullText:
          "It is an unlawful practice for any person to refuse to sell, lease or rent any real property to a purchaser or renter because of the source of income of that person",
      },
      protectedClass: "source_of_income",
      evidence: [
        {
          type: "pattern",
          description: 'Detected phrase: "don\'t accept Section 8 vouchers"',
          sourceId: "EMAIL-2024-0892-02",
          excerpt: "Unfortunately, we don't accept Section 8 vouchers at this property.",
        },
      ],
      analysisNotes: "Explicit denial of Section 8 housing vouchers. Clear violation of ORS 659A.421.",
      confidenceScore: 0.95,
      chainOfThought: [
        "Identified discriminatory_language violation pattern",
        "Matched against source_of_income protection criteria",
        "Applied state jurisdiction rules",
        "Calculated critical severity based on evidence strength",
      ],
    },
  ],
  statisticalAnalysis: {
    disparateImpact: {
      detected: true,
      affectedClasses: ["source_of_income", "familial_status", "race"],
      approvalRateDisparity: 27.7,
      responseTimeDisparity: 4.2,
    },
    timeframeAnalyzed: {
      start: "2023-12-15",
      end: "2024-01-15",
      totalEmailsAnalyzed: 12847,
      totalThreadsAnalyzed: 3421,
    },
  },
  remediationPlan: [
    {
      priority: "immediate",
      action: "Suspend implicated agent(s) pending investigation",
      responsible: "HR Director",
      deadline: "Within 24 hours",
      statute: "General compliance",
    },
    {
      priority: "immediate",
      action: "Cease all Section 8/voucher denial practices immediately",
      responsible: "Operations Director",
      deadline: "Immediately",
      statute: "ORS 659A.421",
    },
    {
      priority: "short-term",
      action: "Conduct mandatory ORS 659A.421 training for all leasing agents",
      responsible: "Training Manager",
      deadline: "Within 7 days",
      statute: "ORS 659A.421",
    },
  ],
  legalDisclaimer: LEGAL_DISCLAIMER,
}

interface ReportSectionProps {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultExpanded?: boolean
  variant?: "cyan" | "magenta" | "amber"
}

function ReportSection({ title, icon: Icon, children, defaultExpanded = false, variant = "cyan" }: ReportSectionProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  const variantStyles = {
    cyan: "border-cyan-500/30",
    magenta: "border-pink-500/30",
    amber: "border-amber-500/30",
  }

  const iconColors = {
    cyan: "text-cyan-400",
    magenta: "text-pink-400",
    amber: "text-amber-400",
  }

  return (
    <div className={cn("border-l-2 pl-4 mb-6", variantStyles[variant])}>
      <button
        className="w-full flex items-center justify-between py-2 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Icon className={cn("w-5 h-5", iconColors[variant])} />
          <h3 className="text-lg font-mono font-semibold text-slate-200">{title}</h3>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {expanded && <div className="mt-4">{children}</div>}
    </div>
  )
}

export function ReportPreview() {
  const [copied, setCopied] = React.useState(false)

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(mockBrief, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <GlassCard className="max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Report Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-500/20 sticky top-0 bg-[rgba(15,20,35,0.95)] z-10">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-xl font-mono font-bold text-cyan-300">Legal Expert Brief</h2>
            <p className="text-xs font-mono text-slate-500">Report ID: {mockBrief.metadata.reportId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyJson}
            className="text-slate-400 hover:text-cyan-400 font-mono"
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? "Copied!" : "Copy JSON"}
          </Button>
          <Button className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
        <div>
          <p className="text-[10px] font-mono text-slate-500 uppercase">Generated</p>
          <p className="text-sm font-mono text-slate-300">
            {new Date(mockBrief.metadata.generatedAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-slate-500 uppercase">Jurisdiction</p>
          <p className="text-sm font-mono text-slate-300">
            {mockBrief.metadata.jurisdiction.county}, {mockBrief.metadata.jurisdiction.state}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-slate-500 uppercase">Federal Coverage</p>
          <p className="text-sm font-mono text-emerald-400">Active</p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-slate-500 uppercase">Version</p>
          <p className="text-sm font-mono text-slate-300">{mockBrief.metadata.version}</p>
        </div>
      </div>

      {/* Executive Summary */}
      <ReportSection title="Executive Summary" icon={Scale} defaultExpanded variant="cyan">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="text-center p-3 rounded-lg bg-slate-800/30">
            <p className="text-2xl font-mono font-bold text-cyan-400">{mockBrief.executiveSummary.totalViolations}</p>
            <p className="text-[10px] font-mono text-slate-500">Total Violations</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-500/10">
            <p className="text-2xl font-mono font-bold text-red-400">{mockBrief.executiveSummary.criticalCount}</p>
            <p className="text-[10px] font-mono text-slate-500">Critical</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-amber-500/10">
            <p className="text-2xl font-mono font-bold text-amber-400">{mockBrief.executiveSummary.highCount}</p>
            <p className="text-[10px] font-mono text-slate-500">High</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-pink-500/10">
            <p className="text-2xl font-mono font-bold text-pink-400">{mockBrief.executiveSummary.mediumCount}</p>
            <p className="text-[10px] font-mono text-slate-500">Medium</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/30">
            <p className="text-2xl font-mono font-bold text-red-400">{mockBrief.executiveSummary.overallRiskScore}</p>
            <p className="text-[10px] font-mono text-slate-500">Risk Score</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono text-slate-400 uppercase">Primary Concerns</p>
          {mockBrief.executiveSummary.primaryConcerns.map((concern, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm font-mono text-slate-300">{concern}</p>
            </div>
          ))}
        </div>
      </ReportSection>

      {/* Violations Detail */}
      <ReportSection title="Violation Details" icon={AlertTriangle} defaultExpanded variant="magenta">
        {mockBrief.violations.map((violation) => (
          <div key={violation.violationId} className="p-4 rounded-lg bg-slate-800/30 border border-pink-500/20 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-pink-400">{violation.violationId}</code>
                <NeonBadge
                  variant={
                    violation.severity === "critical"
                      ? "red"
                      : violation.severity === "high"
                        ? "amber"
                        : violation.severity === "medium"
                          ? "magenta"
                          : "cyan"
                  }
                >
                  {violation.severity.toUpperCase()}
                </NeonBadge>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Confidence: {Math.round(violation.confidenceScore * 100)}%
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Statute Violated</p>
                <code className="text-sm font-mono text-red-400">{violation.statuteViolated.code}</code>
                <p className="text-xs font-mono text-slate-400 mt-1">{violation.statuteViolated.title}</p>
              </div>

              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Evidence</p>
                {violation.evidence.map((ev, i) => (
                  <div key={i} className="p-2 rounded bg-slate-900/50 mt-1">
                    <p className="text-xs font-mono text-slate-400">{ev.description}</p>
                    {ev.excerpt && <p className="text-sm font-mono text-pink-300 mt-1 italic">"{ev.excerpt}"</p>}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Chain of Thought</p>
                <ol className="list-decimal list-inside text-xs font-mono text-slate-400 space-y-1 mt-1">
                  {violation.chainOfThought.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </ReportSection>

      {/* Remediation Plan */}
      <ReportSection title="Remediation Plan" icon={CheckCircle} defaultExpanded variant="amber">
        <div className="space-y-3">
          {mockBrief.remediationPlan.map((action, i) => (
            <div
              key={i}
              className={cn(
                "p-3 rounded-lg border",
                action.priority === "immediate"
                  ? "bg-red-500/10 border-red-500/30"
                  : action.priority === "short-term"
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-cyan-500/10 border-cyan-500/30",
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <NeonBadge
                  variant={
                    action.priority === "immediate" ? "red" : action.priority === "short-term" ? "amber" : "cyan"
                  }
                >
                  {action.priority.toUpperCase()}
                </NeonBadge>
                <div className="flex items-center gap-1 text-xs font-mono text-slate-500">
                  <Clock className="w-3 h-3" />
                  {action.deadline}
                </div>
              </div>
              <p className="text-sm font-mono text-slate-200">{action.action}</p>
              <div className="flex items-center justify-between mt-2 text-xs font-mono text-slate-500">
                <span>Responsible: {action.responsible}</span>
                <code className="text-pink-400">{action.statute}</code>
              </div>
            </div>
          ))}
        </div>
      </ReportSection>

      {/* Disclaimer */}
      <ReportSection title="Legal Disclaimer" icon={Shield} variant="amber">
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <pre className="text-xs font-mono text-slate-400 whitespace-pre-wrap">{mockBrief.legalDisclaimer}</pre>
        </div>
      </ReportSection>
    </GlassCard>
  )
}
