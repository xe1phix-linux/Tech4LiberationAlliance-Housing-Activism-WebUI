"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Search,
  GitBranch,
  ClipboardCheck,
  Settings,
  Shield,
  Activity,
  FileText,
  Zap,
} from "lucide-react"

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "System overview",
  },
  {
    href: "/forensic-audit",
    label: "Forensic Audit",
    icon: Search,
    description: "Deep email analysis",
  },
  {
    href: "/bias-timeline",
    label: "Bias Timeline",
    icon: GitBranch,
    description: "Communication flow",
  },
  {
    href: "/oregon-compliance",
    label: "Oregon Compliance",
    icon: ClipboardCheck,
    description: "ORS 659A checklist",
  },
  {
    href: "/report",
    label: "Legal Reports",
    icon: FileText,
    description: "Generate briefs",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "System configuration",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 glass-panel border-r border-cyan-500/20 flex flex-col overflow-hidden">
      <div className="flex flex-col px-6 py-5 border-b border-cyan-500/20 shrink-0">
        {/* Parent org */}
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-pink-500" />
          <span className="text-[10px] font-mono text-pink-400/80 tracking-wider">TECH 4 LIBERATION ALLIANCE</span>
        </div>
        {/* Main project name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div className="absolute inset-0 blur-md bg-cyan-400/30" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-sm neon-text-cyan animate-flicker leading-tight">
              HOUSING ACTIVISM
            </h1>
            <p className="text-[10px] font-mono text-cyan-400/60 tracking-widest">PROJECT v2.1</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="px-4 py-3 border-b border-cyan-500/20 shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="text-emerald-400">SYSTEM ACTIVE</span>
        </div>
        <div className="text-[10px] font-mono text-slate-500 mt-1">Washington County, OR</div>
      </div>

      {/* Navigation - scrollable */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-cyan-500/30 hover:scrollbar-thumb-cyan-500/50">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group cursor-pointer",
                isActive
                  ? "bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                  : "hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400",
                )}
              />
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-mono transition-colors",
                    isActive ? "text-cyan-300" : "text-slate-300 group-hover:text-cyan-300",
                  )}
                >
                  {item.label}
                </p>
                <p className="text-[10px] font-mono text-slate-500">{item.description}</p>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Jurisdiction Info */}
      <div className="shrink-0 p-4 border-t border-cyan-500/20">
        <div className="text-[10px] font-mono text-slate-500 space-y-1">
          <div className="flex justify-between">
            <span>Telegram</span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>ProtonMail</span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>Gitlab</span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
