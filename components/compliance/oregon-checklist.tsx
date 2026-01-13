"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { CyberGauge } from "@/components/ui/cyber-gauge"
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronRight, Scale, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComplianceItem {
  id: string
  requirement: string
  statute: string
  status: "compliant" | "non-compliant" | "warning" | "review"
  details: string
  lastAudit: string
  evidence?: string[]
}

interface ComplianceCategory {
  category: string
  statuteReference: string
  items: ComplianceItem[]
  overallScore: number
}

const complianceData: ComplianceCategory[] = [
  {
    category: "Source of Income Protection",
    statuteReference: "ORS 659A.421",
    overallScore: 82,
    items: [
      {
        id: "soi-1",
        requirement: "Accept Housing Choice Vouchers (Section 8)",
        statute: "ORS 659A.421(1)",
        status: "non-compliant",
        details: "3 instances of explicit Section 8 denial detected in communications",
        lastAudit: "2024-01-15",
        evidence: ["VIO-2024-001", "VIO-2024-008", "VIO-2024-012"],
      },
      {
        id: "soi-2",
        requirement: "No discrimination based on lawful source of income",
        statute: "ORS 659A.421(2)",
        status: "warning",
        details: "Language suggesting preference for 'private pay' detected",
        lastAudit: "2024-01-15",
        evidence: ["VIO-2024-003"],
      },
      {
        id: "soi-3",
        requirement: "Equal treatment in rental terms and conditions",
        statute: "ORS 659A.421(3)",
        status: "compliant",
        details: "No differential treatment in lease terms detected",
        lastAudit: "2024-01-14",
      },
    ],
  },
  {
    category: "Sexual Orientation & Gender Identity",
    statuteReference: "ORS 659A.403",
    overallScore: 95,
    items: [
      {
        id: "sogi-1",
        requirement: "No discrimination based on sexual orientation",
        statute: "ORS 659A.403(1)",
        status: "compliant",
        details: "No violations detected",
        lastAudit: "2024-01-15",
      },
      {
        id: "sogi-2",
        requirement: "No discrimination based on gender identity",
        statute: "ORS 659A.403(2)",
        status: "compliant",
        details: "No violations detected",
        lastAudit: "2024-01-15",
      },
    ],
  },
  {
    category: "Marital Status Protection",
    statuteReference: "ORS 659A.421",
    overallScore: 91,
    items: [
      {
        id: "ms-1",
        requirement: "No discrimination based on marital status",
        statute: "ORS 659A.421(1)",
        status: "warning",
        details: "One instance of 'married couples preferred' language detected",
        lastAudit: "2024-01-13",
        evidence: ["VIO-2024-019"],
      },
    ],
  },
  {
    category: "Criminal History Screening (Metro Code)",
    statuteReference: "Metro Code 10.01.030",
    overallScore: 88,
    items: [
      {
        id: "ch-1",
        requirement: "Comply with lookback period limitations",
        statute: "Metro Code 10.01.030(a)",
        status: "warning",
        details: "References to '7-year lookback' found; Metro limits to 4 years for most offenses",
        lastAudit: "2024-01-15",
        evidence: ["VIO-2024-005"],
      },
      {
        id: "ch-2",
        requirement: "Individualized assessment requirement",
        statute: "Metro Code 10.01.030(b)",
        status: "compliant",
        details: "Assessment procedures documented",
        lastAudit: "2024-01-12",
      },
      {
        id: "ch-3",
        requirement: "Provide adverse action notice",
        statute: "Metro Code 10.01.030(c)",
        status: "compliant",
        details: "Adverse action notices properly issued",
        lastAudit: "2024-01-14",
      },
    ],
  },
]

const statusConfig = {
  compliant: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/20", label: "COMPLIANT" },
  "non-compliant": { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20", label: "NON-COMPLIANT" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/20", label: "WARNING" },
  review: { icon: FileText, color: "text-cyan-400", bg: "bg-cyan-500/20", label: "UNDER REVIEW" },
}

export function OregonChecklist() {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(["Source of Income Protection"])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Calculate overall compliance
  const overallScore = Math.round(
    complianceData.reduce((sum, cat) => sum + cat.overallScore, 0) / complianceData.length,
  )

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <GlassCard className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Scale className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-xl font-mono font-bold text-cyan-300">Oregon Fair Housing Compliance</h2>
            <p className="text-sm font-mono text-slate-400">ORS 659A & Metro Code Adherence Status</p>
          </div>
        </div>
        <CyberGauge value={overallScore} label="Overall Score" variant="gradient" size="sm" />
      </GlassCard>

      {/* Category Checklists */}
      {complianceData.map((category) => {
        const isExpanded = expandedCategories.includes(category.category)
        const hasIssues = category.items.some((i) => i.status === "non-compliant" || i.status === "warning")

        return (
          <GlassCard
            key={category.category}
            variant={hasIssues ? "magenta" : "cyan"}
            className={cn(hasIssues && "border-pink-500/30")}
          >
            {/* Category Header */}
            <button
              className="w-full flex items-center justify-between"
              onClick={() => toggleCategory(category.category)}
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
                <div className="text-left">
                  <h3 className="text-lg font-mono font-semibold text-slate-200">{category.category}</h3>
                  <code className="text-xs font-mono text-slate-500">{category.statuteReference}</code>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-cyan-400">{category.overallScore}%</div>
                  <div className="text-xs font-mono text-slate-500">Compliance</div>
                </div>
                <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      category.overallScore >= 90
                        ? "bg-emerald-500"
                        : category.overallScore >= 80
                          ? "bg-amber-500"
                          : "bg-red-500",
                    )}
                    style={{ width: `${category.overallScore}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Expanded Items */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                {category.items.map((item) => {
                  const config = statusConfig[item.status]
                  const StatusIcon = config.icon

                  return (
                    <div key={item.id} className={cn("p-3 rounded-lg border", config.bg, "border-transparent")}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <StatusIcon className={cn("w-5 h-5 mt-0.5", config.color)} />
                          <div>
                            <p className="text-sm font-mono text-slate-200">{item.requirement}</p>
                            <code className="text-xs font-mono text-slate-500">{item.statute}</code>
                          </div>
                        </div>
                        <NeonBadge
                          variant={
                            item.status === "compliant"
                              ? "green"
                              : item.status === "non-compliant"
                                ? "red"
                                : item.status === "warning"
                                  ? "amber"
                                  : "cyan"
                          }
                        >
                          {config.label}
                        </NeonBadge>
                      </div>

                      <div className="mt-2 ml-8">
                        <p className="text-xs font-mono text-slate-400">{item.details}</p>
                        <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-slate-500">
                          <span>Last Audit: {item.lastAudit}</span>
                          {item.evidence && <span className="text-pink-400">Related: {item.evidence.join(", ")}</span>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </GlassCard>
        )
      })}
    </div>
  )
}
