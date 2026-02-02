"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { GlobalFilter } from "@/components/dashboard/global-filter"
import { StatsGrid, type StatData } from "@/components/dashboard/stats-grid"
import { ComplianceGauges } from "@/components/dashboard/compliance-gauges"
import { ViolationTable } from "@/components/dashboard/violation-table"
import { LatencyHeatmap } from "@/components/dashboard/latency-heatmap"
import { Gitlab, Github, BookOpen, Code, Star, GitFork } from "lucide-react"

// Xe1phix profile activity stats
const xe1phixStats: StatData[] = [
  {
    title: "GitLab Repositories",
    value: 47,
    subtitle: "Public projects",
    icon: Gitlab,
    variant: "cyan",
    trend: { value: 12, direction: "up" },
  },
  {
    title: "GitHub Contributions",
    value: 1248,
    subtitle: "This year",
    icon: Github,
    variant: "green",
    trend: { value: 8, direction: "up" },
  },
  {
    title: "Knowledge Base Articles",
    value: 156,
    subtitle: "Documentation entries",
    icon: BookOpen,
    variant: "magenta",
  },
  {
    title: "Code Snippets",
    value: 312,
    subtitle: "Gists & pastes",
    icon: Code,
    variant: "amber",
  },
  {
    title: "Stars Received",
    value: 89,
    subtitle: "Across all repos",
    icon: Star,
    variant: "cyan",
    trend: { value: 15, direction: "up" },
  },
  {
    title: "Fork Count",
    value: 34,
    subtitle: "Project forks",
    icon: GitFork,
    variant: "green",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-16 md:ml-64 mt-24 p-6 transition-all duration-300">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-mono font-bold neon-text-cyan animate-flicker">XE1PHIX DASHBOARD</h1>
          <p className="text-sm font-mono text-slate-400 mt-1">
            Profile activity overview and project metrics
          </p>
        </div>

        {/* Global Filter */}
        <GlobalFilter />

        {/* Stats Grid - Xe1phix Profile Activity */}
        <StatsGrid stats={xe1phixStats} />

        {/* Compliance Gauges */}
        <ComplianceGauges />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Latency Heatmap */}
          <LatencyHeatmap />

          {/* Activity Distribution */}
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-lg font-mono font-semibold text-cyan-300 mb-4">Activity Distribution by Platform</h2>
            <div className="space-y-3">
              {[
                { type: "GitLab", count: 47, pct: 35 },
                { type: "GitHub", count: 32, pct: 24 },
                { type: "Gists", count: 28, pct: 21 },
                { type: "Documentation", count: 18, pct: 13 },
                { type: "Other", count: 9, pct: 7 },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm font-mono mb-1">
                    <span className="text-slate-300">{item.type}</span>
                    <span className="text-cyan-400">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Violation Table */}
        <ViolationTable />

        {/* Footer */}
        <div className="mt-8 text-center text-xs font-mono text-slate-500 border-t border-cyan-500/10 pt-6">
          <p className="mb-2">
            HOUSING ACTIVISM PROJECT v2.1 | Tech 4 Liberation Alliance | Federal FHA + ORS 659A + Metro Code
          </p>
          <p className="text-amber-400/60">
            DISCLAIMER: AI-generated analysis. Not legal advice. Consult qualified counsel for compliance decisions.
          </p>
        </div>
      </main>
    </div>
  )
}
