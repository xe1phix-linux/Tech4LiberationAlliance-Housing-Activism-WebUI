"use client"

import * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Button } from "@/components/ui/button"
import { User, Clock, AlertTriangle, ChevronRight, MessageSquare, Shield, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmailMessage {
  id: string
  from: string
  to: string
  timestamp: Date
  subject: string
  body: string
  hasViolation: boolean
  violations?: Array<{
    type: string
    severity: "low" | "medium" | "high" | "critical"
    highlight: string
  }>
  responseLatency?: number
}

interface EmailThread {
  id: string
  property: string
  participants: string[]
  messages: EmailMessage[]
  overallRisk: number
}

const mockThread: EmailThread = {
  id: "THREAD-2024-0892",
  property: "1234 Oak Street, Hillsboro, OR 97124",
  participants: ["[AGENT_REDACTED]", "[APPLICANT_REDACTED]"],
  messages: [
    {
      id: "msg-1",
      from: "[APPLICANT_REDACTED]",
      to: "[AGENT_REDACTED]",
      timestamp: new Date("2024-01-15T09:15:00"),
      subject: "Rental Inquiry - Oak Street 2BR",
      body: "Hi, I'm interested in the 2-bedroom apartment at 1234 Oak Street. I have a Housing Choice Voucher (Section 8) that would cover most of the rent. Is the unit still available? I work full-time and have excellent references.",
      hasViolation: false,
    },
    {
      id: "msg-2",
      from: "[AGENT_REDACTED]",
      to: "[APPLICANT_REDACTED]",
      timestamp: new Date("2024-01-15T16:42:00"),
      subject: "RE: Rental Inquiry - Oak Street 2BR",
      body: "Hello, thanks for reaching out. Unfortunately, we don't accept Section 8 vouchers at this property. The owner prefers to work with tenants who can pay the full rent privately. We have other properties in less expensive areas that might work better for your situation. Let me know if you'd like to see those instead.",
      hasViolation: true,
      violations: [
        {
          type: "Source of Income Discrimination",
          severity: "critical",
          highlight: "we don't accept Section 8 vouchers",
        },
        {
          type: "Steering",
          severity: "high",
          highlight: "other properties in less expensive areas",
        },
      ],
      responseLatency: 447, // 7h 27m
    },
    {
      id: "msg-3",
      from: "[APPLICANT_REDACTED]",
      to: "[AGENT_REDACTED]",
      timestamp: new Date("2024-01-15T17:05:00"),
      subject: "RE: Rental Inquiry - Oak Street 2BR",
      body: "I understand. I was really hoping to stay in this area because of the schools. Is there any flexibility on the voucher policy?",
      hasViolation: false,
    },
    {
      id: "msg-4",
      from: "[AGENT_REDACTED]",
      to: "[APPLICANT_REDACTED]",
      timestamp: new Date("2024-01-16T11:30:00"),
      subject: "RE: Rental Inquiry - Oak Street 2BR",
      body: "Sorry, the owner's decision is final. The Hillsboro area tends to be more family-friendly anyway, with better schools. You'd probably fit in better in some of our properties in Aloha or Cornelius. Those communities are more diverse and accepting of different payment situations.",
      hasViolation: true,
      violations: [
        {
          type: "Steering",
          severity: "high",
          highlight: "family-friendly",
        },
        {
          type: "Steering",
          severity: "high",
          highlight: "fit in better",
        },
        {
          type: "Potential Race/National Origin",
          severity: "medium",
          highlight: "more diverse",
        },
      ],
      responseLatency: 1105, // 18h 25m
    },
  ],
  overallRisk: 89,
}

const severityColors = {
  low: "bg-cyan-500/30 text-cyan-300 border-cyan-500/50",
  medium: "bg-pink-500/30 text-pink-300 border-pink-500/50",
  high: "bg-amber-500/30 text-amber-300 border-amber-500/50",
  critical: "bg-red-500/30 text-red-300 border-red-500/50",
}

function highlightViolations(text: string, violations?: EmailMessage["violations"]): React.ReactNode {
  if (!violations || violations.length === 0) return text

  const result = text
  const highlights: Array<{ text: string; severity: string }> = []

  for (const v of violations) {
    if (result.includes(v.highlight)) {
      highlights.push({ text: v.highlight, severity: v.severity })
    }
  }

  if (highlights.length === 0) return text

  // Simple highlight - in production, use a proper HTML parser
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  for (const h of highlights) {
    const index = remaining.indexOf(h.text)
    if (index >= 0) {
      parts.push(<span key={key++}>{remaining.substring(0, index)}</span>)
      parts.push(
        <mark
          key={key++}
          className={cn(
            "px-1 rounded font-medium",
            h.severity === "critical" && "bg-red-500/40 text-red-200",
            h.severity === "high" && "bg-amber-500/40 text-amber-200",
            h.severity === "medium" && "bg-pink-500/40 text-pink-200",
            h.severity === "low" && "bg-cyan-500/40 text-cyan-200",
          )}
        >
          {h.text}
        </mark>,
      )
      remaining = remaining.substring(index + h.text.length)
    }
  }
  parts.push(<span key={key++}>{remaining}</span>)

  return parts
}

export function EmailThreadViewer() {
  const [showRedacted, setShowRedacted] = React.useState(true)
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(null)

  return (
    <GlassCard className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-mono font-semibold text-cyan-300">Communication Thread Analysis</h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">{mockThread.id}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRedacted(!showRedacted)}
            className="text-slate-400 hover:text-cyan-400"
          >
            {showRedacted ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showRedacted ? "PII Redacted" : "Show Raw"}
          </Button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-mono text-red-400">Risk: {mockThread.overallRisk}/100</span>
          </div>
        </div>
      </div>

      {/* Property Info */}
      <div className="mb-4 p-3 rounded-lg bg-slate-800/50 border border-cyan-500/20">
        <div className="text-xs font-mono text-slate-400 uppercase mb-1">Property</div>
        <div className="text-sm font-mono text-cyan-300">{mockThread.property}</div>
      </div>

      {/* Message Thread */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {mockThread.messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "relative pl-6 pb-4",
              index < mockThread.messages.length - 1 && "border-l border-cyan-500/20",
            )}
          >
            {/* Timeline dot */}
            <div
              className={cn(
                "absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1.5",
                message.hasViolation
                  ? "bg-red-500 shadow-[0_0_10px_rgba(255,50,50,0.5)]"
                  : "bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
              )}
            />

            {/* Message Card */}
            <div
              className={cn(
                "p-4 rounded-lg transition-all cursor-pointer",
                message.hasViolation
                  ? "bg-red-500/5 border border-red-500/20"
                  : "bg-slate-800/30 border border-slate-700/30",
                selectedMessage === message.id && "ring-1 ring-cyan-400/50",
              )}
              onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-mono text-slate-300">{message.from}</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span className="text-sm font-mono text-slate-400">{message.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  {message.responseLatency && (
                    <span
                      className={cn(
                        "text-xs font-mono",
                        message.responseLatency > 480 ? "text-amber-400" : "text-slate-500",
                      )}
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      {Math.floor(message.responseLatency / 60)}h {message.responseLatency % 60}m
                    </span>
                  )}
                  <span className="text-xs font-mono text-slate-500">{message.timestamp.toLocaleString()}</span>
                </div>
              </div>

              {/* Subject */}
              <div className="text-xs font-mono text-slate-500 mb-2">RE: {message.subject}</div>

              {/* Body */}
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {highlightViolations(message.body, message.violations)}
              </p>

              {/* Violations */}
              {message.violations && message.violations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-3 h-3 text-red-400" />
                    <span className="text-xs font-mono text-red-400 uppercase">Detected Violations</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {message.violations.map((v, i) => (
                      <NeonBadge
                        key={i}
                        variant={
                          v.severity === "critical"
                            ? "red"
                            : v.severity === "high"
                              ? "amber"
                              : v.severity === "medium"
                                ? "magenta"
                                : "cyan"
                        }
                      >
                        {v.type}
                      </NeonBadge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
