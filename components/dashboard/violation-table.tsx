"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink, AlertCircle, Scale, FileText } from "lucide-react"

interface ViolationRow {
  id: string
  timestamp: string
  property: string
  violationType: string
  protectedClass: string
  statute: string
  severity: "low" | "medium" | "high" | "critical"
  riskScore: number
  status: "pending" | "reviewed" | "escalated"
}

const mockViolations: ViolationRow[] = [
  {
    id: "VIO-2024-001",
    timestamp: "2024-01-15 14:32",
    property: "1234 Oak St, Hillsboro",
    violationType: "Source of Income",
    protectedClass: "Section 8 Voucher",
    statute: "ORS 659A.421",
    severity: "critical",
    riskScore: 89,
    status: "pending",
  },
  {
    id: "VIO-2024-002",
    timestamp: "2024-01-15 11:18",
    property: "567 Cedar Ave, Beaverton",
    violationType: "Steering",
    protectedClass: "Familial Status",
    statute: "42 U.S.C. § 3604(b)",
    severity: "high",
    riskScore: 72,
    status: "reviewed",
  },
  {
    id: "VIO-2024-003",
    timestamp: "2024-01-14 16:45",
    property: "890 Pine Rd, Tigard",
    violationType: "Discriminatory Language",
    protectedClass: "National Origin",
    statute: "42 U.S.C. § 3604(a)",
    severity: "high",
    riskScore: 68,
    status: "escalated",
  },
  {
    id: "VIO-2024-004",
    timestamp: "2024-01-14 09:22",
    property: "234 Maple Ln, Tualatin",
    violationType: "Response Latency",
    protectedClass: "Race (inferred)",
    statute: "42 U.S.C. § 3604(a)",
    severity: "medium",
    riskScore: 45,
    status: "pending",
  },
  {
    id: "VIO-2024-005",
    timestamp: "2024-01-13 15:10",
    property: "456 Birch St, Lake Oswego",
    violationType: "Criminal History",
    protectedClass: "Criminal Record",
    statute: "Metro Code 10.01.030",
    severity: "medium",
    riskScore: 38,
    status: "reviewed",
  },
]

const severityConfig = {
  critical: { variant: "red" as const, label: "CRITICAL" },
  high: { variant: "amber" as const, label: "HIGH" },
  medium: { variant: "magenta" as const, label: "MEDIUM" },
  low: { variant: "cyan" as const, label: "LOW" },
}

const statusConfig = {
  pending: { variant: "amber" as const, label: "PENDING" },
  reviewed: { variant: "cyan" as const, label: "REVIEWED" },
  escalated: { variant: "red" as const, label: "ESCALATED" },
}

export function ViolationTable() {
  const [sortField, setSortField] = React.useState<keyof ViolationRow>("riskScore")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc")
  const [expandedRow, setExpandedRow] = React.useState<string | null>(null)

  const sortedViolations = React.useMemo(() => {
    return [...mockViolations].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      const modifier = sortDirection === "asc" ? 1 : -1
      return aVal < bVal ? -1 * modifier : aVal > bVal ? 1 * modifier : 0
    })
  }, [sortField, sortDirection])

  const handleSort = (field: keyof ViolationRow) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const SortIcon = ({ field }: { field: keyof ViolationRow }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3 text-cyan-400" />
    ) : (
      <ChevronDown className="w-3 h-3 text-cyan-400" />
    )
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-mono font-semibold text-cyan-300">Violation Registry</h2>
        </div>
        <div className="text-xs font-mono text-slate-400">Sorted by Litigation Risk Score</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th
                className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center gap-1">
                  ID <SortIcon field="id" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center gap-1">
                  Timestamp <SortIcon field="timestamp" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">
                Property
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">
                Violation
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">Statute</th>
              <th
                className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("severity")}
              >
                <div className="flex items-center gap-1">
                  Severity <SortIcon field="severity" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort("riskScore")}
              >
                <div className="flex items-center gap-1">
                  Risk <SortIcon field="riskScore" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-mono text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-mono text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedViolations.map((violation) => (
              <React.Fragment key={violation.id}>
                <tr
                  className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors cursor-pointer"
                  onClick={() => setExpandedRow(expandedRow === violation.id ? null : violation.id)}
                >
                  <td className="px-4 py-3 font-mono text-sm text-cyan-300">{violation.id}</td>
                  <td className="px-4 py-3 font-mono text-sm text-slate-400">{violation.timestamp}</td>
                  <td className="px-4 py-3 font-mono text-sm text-slate-300">{violation.property}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-slate-200">{violation.violationType}</div>
                    <div className="text-xs text-slate-500">{violation.protectedClass}</div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs font-mono text-pink-400 bg-pink-500/10 px-2 py-1 rounded">
                      {violation.statute}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <NeonBadge variant={severityConfig[violation.severity].variant}>
                      {severityConfig[violation.severity].label}
                    </NeonBadge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-2 rounded-full bg-slate-800 overflow-hidden"
                        title={`Risk Score: ${violation.riskScore}`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            violation.riskScore >= 70
                              ? "bg-red-500"
                              : violation.riskScore >= 50
                                ? "bg-amber-500"
                                : "bg-cyan-500"
                          }`}
                          style={{ width: `${violation.riskScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-400">{violation.riskScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <NeonBadge variant={statusConfig[violation.status].variant}>
                      {statusConfig[violation.status].label}
                    </NeonBadge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {expandedRow === violation.id && (
                  <tr className="bg-slate-900/50">
                    <td colSpan={9} className="px-4 py-4">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <Scale className="w-3 h-3" /> Legal Reference
                          </h4>
                          <p className="text-sm text-slate-300">
                            Potential violation under {violation.statute}. Protected class: {violation.protectedClass}.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <FileText className="w-3 h-3" /> Evidence Summary
                          </h4>
                          <p className="text-sm text-slate-300">
                            Email contains language indicating discriminatory intent. Full thread analysis available.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase mb-2">Recommended Action</h4>
                          <p className="text-sm text-amber-300">
                            Agent retraining required. Document corrective action for compliance records.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
