"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { GitBranch, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SteeringNode {
  id: string
  phrase: string
  category: string
  violationType: string
  severity: "low" | "medium" | "high" | "critical"
  protectedClass: string
  children?: SteeringNode[]
}

const steeringTree: SteeringNode = {
  id: "root",
  phrase: "Discriminatory Language Patterns",
  category: "root",
  violationType: "overview",
  severity: "high",
  protectedClass: "multiple",
  children: [
    {
      id: "income",
      phrase: "Source of Income",
      category: "ORS 659A.421",
      violationType: "Direct Discrimination",
      severity: "critical",
      protectedClass: "source_of_income",
      children: [
        {
          id: "income-1",
          phrase: '"don\'t accept Section 8"',
          category: "Explicit Denial",
          violationType: "discriminatory_language",
          severity: "critical",
          protectedClass: "source_of_income",
        },
        {
          id: "income-2",
          phrase: '"private pay only"',
          category: "Implicit Denial",
          violationType: "discriminatory_language",
          severity: "high",
          protectedClass: "source_of_income",
        },
        {
          id: "income-3",
          phrase: '"owner prefers"',
          category: "Proxy Language",
          violationType: "discriminatory_language",
          severity: "high",
          protectedClass: "source_of_income",
        },
      ],
    },
    {
      id: "steering",
      phrase: "Geographic Steering",
      category: "42 U.S.C. § 3604",
      violationType: "Steering",
      severity: "high",
      protectedClass: "race",
      children: [
        {
          id: "steer-1",
          phrase: '"less expensive areas"',
          category: "Economic Steering",
          violationType: "steering",
          severity: "high",
          protectedClass: "race",
        },
        {
          id: "steer-2",
          phrase: '"fit in better"',
          category: "Social Steering",
          violationType: "steering",
          severity: "high",
          protectedClass: "race",
        },
        {
          id: "steer-3",
          phrase: '"more diverse"',
          category: "Demographic Reference",
          violationType: "steering",
          severity: "medium",
          protectedClass: "race",
        },
      ],
    },
    {
      id: "familial",
      phrase: "Familial Status",
      category: "42 U.S.C. § 3604(b)",
      violationType: "Steering",
      severity: "high",
      protectedClass: "familial_status",
      children: [
        {
          id: "fam-1",
          phrase: '"family-friendly"',
          category: "Preference Indicator",
          violationType: "steering",
          severity: "high",
          protectedClass: "familial_status",
        },
        {
          id: "fam-2",
          phrase: '"better schools"',
          category: "Steering Proxy",
          violationType: "steering",
          severity: "medium",
          protectedClass: "familial_status",
        },
      ],
    },
  ],
}

const severityColors = {
  low: { bg: "bg-cyan-500/20", border: "border-cyan-500/40", text: "text-cyan-300" },
  medium: { bg: "bg-pink-500/20", border: "border-pink-500/40", text: "text-pink-300" },
  high: { bg: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-300" },
  critical: { bg: "bg-red-500/20", border: "border-red-500/40", text: "text-red-300" },
}

function MindmapNode({ node, depth = 0 }: { node: SteeringNode; depth?: number }) {
  const [expanded, setExpanded] = React.useState(depth < 2)
  const colors = severityColors[node.severity]
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className={cn("relative", depth > 0 && "ml-6")}>
      {/* Connection line */}
      {depth > 0 && <div className="absolute left-[-12px] top-4 w-3 h-px bg-cyan-500/30" />}

      {/* Node */}
      <div
        className={cn(
          "rounded-lg p-3 border transition-all cursor-pointer",
          colors.bg,
          colors.border,
          hasChildren && "hover:shadow-[0_0_15px_rgba(0,255,255,0.1)]",
        )}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className={cn("text-sm font-mono font-medium", colors.text)}>{node.phrase}</p>
            <p className="text-xs font-mono text-slate-500 mt-0.5">{node.category}</p>
          </div>
          {hasChildren && (
            <div className="text-xs font-mono text-slate-400">{expanded ? "−" : `+${node.children!.length}`}</div>
          )}
        </div>

        {depth > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <NeonBadge
              variant={
                node.severity === "critical"
                  ? "red"
                  : node.severity === "high"
                    ? "amber"
                    : node.severity === "medium"
                      ? "magenta"
                      : "cyan"
              }
            >
              {node.severity.toUpperCase()}
            </NeonBadge>
            <span className="text-[10px] font-mono text-slate-500">{node.protectedClass}</span>
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="mt-2 space-y-2 border-l border-cyan-500/20 ml-3">
          {node.children!.map((child) => (
            <MindmapNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function SteeringMindmap() {
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-mono font-semibold text-cyan-300">Steering Pattern Mindmap</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <AlertCircle className="w-3 h-3" />
          <span>Click nodes to expand/collapse</span>
        </div>
      </div>

      <div className="space-y-4">
        <MindmapNode node={steeringTree} />
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-cyan-500/20">
        <div className="text-xs font-mono text-slate-400 uppercase mb-2">Severity Legend</div>
        <div className="flex gap-4">
          {(["critical", "high", "medium", "low"] as const).map((sev) => (
            <div key={sev} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded", severityColors[sev].bg, severityColors[sev].border, "border")} />
              <span className="text-xs font-mono text-slate-400 capitalize">{sev}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
