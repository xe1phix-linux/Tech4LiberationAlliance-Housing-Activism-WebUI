"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Brain, ChevronDown, ChevronRight, Zap, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChainOfThoughtStep } from "@/lib/ai-analysis"

interface CoTReasoningPanelProps {
  steps: ChainOfThoughtStep[]
  processingTimeMs: number
  confidenceScore: number
}

const mockSteps: ChainOfThoughtStep[] = [
  {
    step: 1,
    reasoning: "First, redact PII for SOC2 compliance before analysis",
    evidence: ["Redacted 3 PII elements: 1 phone number, 1 email address, 1 potential name"],
    conclusion: "Content sanitized for privacy-preserving analysis",
  },
  {
    step: 2,
    reasoning: "Scan content against known discriminatory language patterns",
    evidence: [
      'Found "don\'t accept Section 8 vouchers" matching Source of Income discrimination pattern',
      'Found "family-friendly" matching Familial Status steering indicator',
      'Found "fit in better" matching potential steering language',
      'Found "more diverse" matching potential race-based steering',
    ],
    conclusion: "Detected 4 potential pattern violations across 2 messages",
  },
  {
    step: 3,
    reasoning: "Analyze response time for potential disparate treatment indicators",
    evidence: [
      "Initial response latency: 447 minutes (7h 27m) - exceeds standard threshold",
      "Second response latency: 1105 minutes (18h 25m) - significantly delayed",
      "Pattern correlation: Section 8 inquiry received delayed response",
    ],
    conclusion: "Response time suggests potential digital redlining - 4.2x standard latency for voucher inquiry",
  },
  {
    step: 4,
    reasoning: "Calculate overall severity and litigation risk based on cumulative violations",
    evidence: [
      "Total violations: 5",
      "Federal violations: 1 (steering based on familial status)",
      "State violations: 2 (ORS 659A.421 source of income)",
      "Multiple violation types increases litigation exposure",
    ],
    conclusion: "Overall severity: CRITICAL, Litigation risk: 89/100",
  },
  {
    step: 5,
    reasoning: "Generate remediation recommendations based on violation types and severity",
    evidence: [
      "ESCALATE: Immediate legal review required",
      "ESCALATE: Suspend agent pending investigation",
      "Document all evidence for potential litigation defense",
      "Notify property owner of legal liability exposure",
    ],
    conclusion: "Action plan generated for compliance remediation",
  },
]

export function CoTReasoningPanel({
  steps = mockSteps,
  processingTimeMs = 847,
  confidenceScore = 0.91,
}: Partial<CoTReasoningPanelProps>) {
  const [expandedSteps, setExpandedSteps] = React.useState<number[]>([1, 2, 4])

  const toggleStep = (step: number) => {
    setExpandedSteps((prev) => (prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]))
  }

  return (
    <GlassCard variant="magenta">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-pink-500/20">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-pink-400" />
          <h2 className="text-lg font-mono font-semibold text-pink-300">Chain of Thought Analysis</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{processingTimeMs}ms</span>
          </div>
          <NeonBadge variant="magenta">Confidence: {Math.round(confidenceScore * 100)}%</NeonBadge>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isExpanded = expandedSteps.includes(step.step)
          const isConclusive =
            step.conclusion.includes("CRITICAL") ||
            step.conclusion.includes("violation") ||
            step.conclusion.includes("detected")

          return (
            <div
              key={step.step}
              className={cn(
                "rounded-lg border transition-all",
                isConclusive ? "bg-pink-500/5 border-pink-500/30" : "bg-slate-800/30 border-slate-700/30",
              )}
            >
              {/* Step Header */}
              <button
                className="w-full flex items-center justify-between p-3 text-left"
                onClick={() => toggleStep(step.step)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold",
                      isConclusive ? "bg-pink-500/30 text-pink-300" : "bg-cyan-500/20 text-cyan-400",
                    )}
                  >
                    {step.step}
                  </div>
                  <span className="text-sm font-mono text-slate-300">{step.reasoning}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0">
                  {/* Evidence */}
                  <div className="ml-9 space-y-2">
                    <div className="text-xs font-mono text-slate-500 uppercase">Evidence</div>
                    <ul className="space-y-1">
                      {step.evidence.map((e, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-pink-400 mt-1">•</span>
                          <span className="font-mono">{e}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Conclusion */}
                    <div className="mt-3 p-2 rounded bg-slate-900/50 border border-slate-700/30">
                      <div className="flex items-center gap-2">
                        {isConclusive ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        )}
                        <span className="text-xs font-mono text-slate-400 uppercase">Conclusion</span>
                      </div>
                      <p className={cn("text-sm font-mono mt-1", isConclusive ? "text-pink-300" : "text-slate-300")}>
                        {step.conclusion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Final Assessment */}
      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase mb-1">AI Assessment Complete</div>
            <p className="text-sm font-mono text-pink-300">
              5-step forensic analysis identified {steps.filter((s) => s.conclusion.includes("violation")).length}{" "}
              violation categories
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold neon-text-magenta">89</div>
            <div className="text-xs font-mono text-slate-400">Litigation Risk</div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
