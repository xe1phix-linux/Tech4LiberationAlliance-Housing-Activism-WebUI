"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart3,
  MessageSquareCode,
  Briefcase,
  BookOpen,
  Library,
  Settings,
  Shield,
  Activity,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "System overview",
  },
  {
    href: "/visualizations",
    label: "Visualizations",
    icon: BarChart3,
    description: "Data charts & graphs",
  },
  {
    href: "/ai-chatbot",
    label: "AI Coding Chatbot",
    icon: MessageSquareCode,
    description: "Code assistance",
  },
  {
    href: "/portfolio",
    label: "Professional Portfolio",
    icon: Briefcase,
    description: "Projects & work",
  },
  {
    href: "/knowledge-base",
    label: "Knowledge Base",
    icon: BookOpen,
    description: "Documentation",
  },
  {
    href: "/prompt-library",
    label: "Prompt Library",
    icon: Library,
    description: "AI prompts collection",
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen glass-panel border-r border-cyan-500/20 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 z-50 w-6 h-6 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 transition-colors cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-cyan-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-cyan-400" />
        )}
      </button>

      <div className={cn(
        "flex flex-col border-b border-cyan-500/20 shrink-0 transition-all duration-300",
        isCollapsed ? "px-2 py-3" : "px-6 py-5"
      )}>
        {/* Parent org */}
        {!isCollapsed && (
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-pink-500" />
            <span className="text-[10px] font-mono text-pink-400/80 tracking-wider">TECH 4 LIBERATION ALLIANCE</span>
          </div>
        )}
        {/* Main project name */}
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
          <div className="relative">
            <Shield className={cn("text-cyan-400", isCollapsed ? "w-6 h-6" : "w-8 h-8")} />
            <div className="absolute inset-0 blur-md bg-cyan-400/30" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-mono font-bold text-sm neon-text-cyan animate-flicker leading-tight">
                HOUSING ACTIVISM
              </h1>
              <p className="text-[10px] font-mono text-cyan-400/60 tracking-widest">PROJECT v2.1</p>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className={cn(
        "border-b border-cyan-500/20 shrink-0 transition-all duration-300",
        isCollapsed ? "px-2 py-2" : "px-4 py-3"
      )}>
        <div className={cn("flex items-center text-xs font-mono", isCollapsed ? "justify-center" : "gap-2")}>
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          {!isCollapsed && <span className="text-emerald-400">SYSTEM ACTIVE</span>}
        </div>
        {!isCollapsed && <div className="text-[10px] font-mono text-slate-500 mt-1">Washington County, OR</div>}
      </div>

      {/* Navigation - scrollable */}
      <nav className={cn(
        "flex-1 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-cyan-500/30 hover:scrollbar-thumb-cyan-500/50 transition-all duration-300",
        isCollapsed ? "px-2" : "px-3"
      )}>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-md transition-all duration-200 group cursor-pointer",
                isCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5",
                isActive
                  ? "bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                  : "hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors flex-shrink-0",
                  isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400",
                )}
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-mono transition-colors truncate",
                      isActive ? "text-cyan-300" : "text-slate-300 group-hover:text-cyan-300",
                    )}
                  >
                    {item.label}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 truncate">{item.description}</p>
                </div>
              )}
              {isActive && !isCollapsed && (
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Jurisdiction Info */}
      {!isCollapsed && (
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
      )}
    </aside>
  )
}
