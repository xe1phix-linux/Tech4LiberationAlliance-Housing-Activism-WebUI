"use client"

import type * as React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Mail, AlertTriangle, Shield, TrendingUp, FileWarning, CheckCircle } from "lucide-react"

export interface StatData {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: { value: number; direction: "up" | "down" }
  variant?: "cyan" | "magenta" | "amber" | "red" | "green"
}

interface StatCardProps extends StatData {}

function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "cyan" }: StatCardProps) {
  const variantStyles = {
    cyan: { icon: "text-cyan-400", glow: "shadow-[0_0_20px_rgba(0,255,255,0.2)]" },
    magenta: { icon: "text-pink-400", glow: "shadow-[0_0_20px_rgba(255,0,150,0.2)]" },
    amber: { icon: "text-amber-400", glow: "shadow-[0_0_20px_rgba(255,170,0,0.2)]" },
    red: { icon: "text-red-400", glow: "shadow-[0_0_20px_rgba(255,50,50,0.2)]" },
    green: { icon: "text-emerald-400", glow: "shadow-[0_0_20px_rgba(0,255,150,0.2)]" },
  }

  const styles = variantStyles[variant]

  return (
    <GlassCard className={`relative overflow-hidden ${styles.glow}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">{title}</p>
          <p className={`text-3xl font-mono font-bold mt-1 ${styles.icon}`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-xs font-mono text-slate-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp
                className={`w-3 h-3 ${trend.direction === "up" ? "text-emerald-400" : "text-red-400 rotate-180"}`}
              />
              <span className={`text-xs font-mono ${trend.direction === "up" ? "text-emerald-400" : "text-red-400"}`}>
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-slate-800/50 ${styles.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div
          className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-current to-transparent ${styles.icon}`}
        />
      </div>
    </GlassCard>
  )
}

interface StatsGridProps {
  stats?: StatData[]
}

const defaultStats: StatData[] = [
  {
    title: "Emails Analyzed",
    value: 0,
    subtitle: "Awaiting analysis",
    icon: Mail,
    variant: "cyan",
  },
  {
    title: "Violations Detected",
    value: 0,
    subtitle: "Across all jurisdictions",
    icon: AlertTriangle,
    variant: "red",
  },
  {
    title: "High Risk Cases",
    value: 0,
    subtitle: "Requires immediate review",
    icon: FileWarning,
    variant: "amber",
  },
  {
    title: "Compliance Rate",
    value: "--",
    subtitle: "ORS 659A adherence",
    icon: Shield,
    variant: "green",
  },
  {
    title: "Avg Response Latency",
    value: "--",
    subtitle: "Section 8 inquiries",
    icon: TrendingUp,
    variant: "magenta",
  },
  {
    title: "Cases Cleared",
    value: 0,
    subtitle: "This month",
    icon: CheckCircle,
    variant: "green",
  },
]

export function StatsGrid({ stats = defaultStats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
