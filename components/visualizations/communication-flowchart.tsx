"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { GitBranch, Clock, AlertTriangle, CheckCircle, XCircle, User, Building } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlowNode {
  id: string
  type: "inquiry" | "response" | "followup" | "decision" | "violation"
  label: string
  timestamp: string
  actor: "applicant" | "agent" | "system"
  latency?: number
  violation?: {
    type: string
    severity: "low" | "medium" | "high" | "critical"
  }
  outcome?: "positive" | "negative" | "neutral"
}

const flowData: FlowNode[] = [
  {
    id: "1",
    type: "inquiry",
    label: "Initial Rental Inquiry",
    timestamp: "Jan 15, 09:15",
    actor: "applicant",
    outcome: "neutral",
  },
  {
    id: "2",
    type: "violation",
    label: "Section 8 Disclosure",
    timestamp: "Jan 15, 09:15",
    actor: "applicant",
    violation: { type: "Trigger Point", severity: "medium" },
  },
  {
    id: "3",
    type: "response",
    label: "Agent Response",
    timestamp: "Jan 15, 16:42",
    actor: "agent",
    latency: 447,
    violation: { type: "Source of Income Denial", severity: "critical" },
  },
  {
    id: "4",
    type: "violation",
    label: "Steering Suggestion",
    timestamp: "Jan 15, 16:42",
    actor: "agent",
    violation: { type: "Geographic Steering", severity: "high" },
  },
  {
    id: "5",
    type: "followup",
    label: "Applicant Follow-up",
    timestamp: "Jan 15, 17:05",
    actor: "applicant",
    outcome: "neutral",
  },
  {
    id: "6",
    type: "response",
    label: "Final Response",
    timestamp: "Jan 16, 11:30",
    actor: "agent",
    latency: 1105,
    violation: { type: "Multiple Steering Phrases", severity: "high" },
  },
  {
    id: "7",
    type: "decision",
    label: "Application Denied",
    timestamp: "Jan 16, 11:30",
    actor: "system",
    outcome: "negative",
  },
]

const actorIcons = {
  applicant: User,
  agent: Building,
  system: AlertTriangle,
}

const nodeColors = {
  inquiry: { bg: "bg-cyan-500/20", border: "border-cyan-500/40", icon: "text-cyan-400" },
  response: { bg: "bg-slate-700/40", border: "border-slate-600/40", icon: "text-slate-400" },
  followup: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", icon: "text-cyan-300" },
  decision: { bg: "bg-pink-500/20", border: "border-pink-500/40", icon: "text-pink-400" },
  violation: { bg: "bg-red-500/20", border: "border-red-500/40", icon: "text-red-400" },
}

export function CommunicationFlowchart() {
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null)

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-mono font-semibold text-cyan-300">Communication Flowchart</h2>
        </div>
        <div className="text-xs font-mono text-slate-400">Thread Timeline Analysis</div>
      </div>

      {/* Flowchart */}
      <div className="relative">
        {/* Central timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-pink-500/50 to-red-500/50" />

        <div className="space-y-4">
          {flowData.map((node, index) => {
            const Icon = actorIcons[node.actor]
            const colors = nodeColors[node.type]
            const isLeft = node.actor === "applicant"

            return (
              <div
                key={node.id}
                className={cn("flex items-center gap-4", isLeft ? "flex-row" : "flex-row-reverse")}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                {/* Node content */}
                <div
                  className={cn(
                    "flex-1 p-3 rounded-lg border cursor-pointer transition-all",
                    colors.bg,
                    colors.border,
                    selectedNode === node.id && "ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,255,255,0.1)]",
                    "hover:shadow-[0_0_10px_rgba(0,255,255,0.05)]",
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("w-4 h-4", colors.icon)} />
                      <span className="text-sm font-mono text-slate-200">{node.label}</span>
                    </div>
                    {node.latency && (
                      <div
                        className={cn(
                          "flex items-center gap-1 text-xs font-mono",
                          node.latency > 480 ? "text-amber-400" : "text-slate-500",
                        )}
                      >
                        <Clock className="w-3 h-3" />
                        {Math.floor(node.latency / 60)}h {node.latency % 60}m
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">{node.timestamp}</span>
                    {node.violation && (
                      <NeonBadge
                        variant={
                          node.violation.severity === "critical"
                            ? "red"
                            : node.violation.severity === "high"
                              ? "amber"
                              : "magenta"
                        }
                      >
                        {node.violation.type}
                      </NeonBadge>
                    )}
                    {node.outcome && (
                      <div className="flex items-center gap-1">
                        {node.outcome === "positive" && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                        {node.outcome === "negative" && <XCircle className="w-3 h-3 text-red-400" />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline connector */}
                <div className="relative w-8 flex items-center justify-center">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 z-10",
                      node.violation ? "bg-red-500 border-red-400" : "bg-slate-700 border-cyan-500/50",
                      node.violation && "shadow-[0_0_10px_rgba(255,50,50,0.5)]",
                    )}
                  />
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-cyan-500/20 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-cyan-400">7</div>
          <div className="text-xs font-mono text-slate-400">Total Events</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-red-400">4</div>
          <div className="text-xs font-mono text-slate-400">Violations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-amber-400">25.9h</div>
          <div className="text-xs font-mono text-slate-400">Total Latency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-pink-400">DENIED</div>
          <div className="text-xs font-mono text-slate-400">Outcome</div>
        </div>
      </div>
    </GlassCard>
  )
}
