"use client"

import { Shield, Zap } from "lucide-react"
import { UserDropdown } from "./user-dropdown"
import { BadgeStrip } from "./badge-strip"

export function TopNavbar() {
  return (
    <div className="fixed top-0 left-16 md:left-64 right-0 z-30 transition-all duration-300">
      {/* Main Navbar */}
      <nav className="glass-panel border-b border-cyan-500/20 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Project Branding */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-pink-500" />
              <span className="text-xs font-mono text-pink-400/80 tracking-wider">TECH 4 LIBERATION ALLIANCE</span>
            </div>
            <div className="w-px h-6 bg-cyan-500/30" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-mono font-bold text-cyan-300">HOUSING ACTIVISM PROJECT</span>
            </div>
          </div>

          {/* Right: User Dropdown */}
          <UserDropdown />
        </div>
      </nav>

      {/* Badge Strip */}
      <BadgeStrip />
    </div>
  )
}
