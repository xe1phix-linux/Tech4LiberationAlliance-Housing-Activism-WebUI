"use client"

import { useState, useRef, useEffect } from "react"
import { LogOut } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/social-links"
import Image from "next/image"

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500/50 hover:border-cyan-400 transition-all hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] cursor-pointer"
      >
        <Image
          src="https://gitlab.com/uploads/-/system/user/avatar/676424/avatar.png?width=800"
          alt="User Avatar"
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed right-4 top-16 w-96 bg-black rounded-lg border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.15)] z-[99999] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-cyan-500/20 bg-black">
            <p className="text-xs font-mono text-slate-400">Signed in as</p>
            <p className="text-sm font-mono font-bold text-cyan-300">Xe1phix</p>
          </div>

          <div className="max-h-80 overflow-y-auto scrollbar-thin bg-black">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-cyan-500/10 transition-colors border-b border-cyan-500/10 last:border-b-0"
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${link.iconColor}`} />
                  <span className="flex-shrink-0 text-sm font-mono text-slate-300">{link.name}</span>
                  <div className="flex flex-wrap gap-1 justify-end flex-1">
                    <img src={link.badge || "/placeholder.svg"} alt={`${link.name} badge`} className="h-5" />
                    {link.extraBadges?.map((badge, idx) => (
                      <img
                        key={idx}
                        src={badge || "/placeholder.svg"}
                        alt={`${link.name} extra badge`}
                        className="h-5"
                      />
                    ))}
                  </div>
                </a>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-cyan-500/20 bg-black">
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-mono text-pink-400 hover:bg-pink-500/10 transition-colors cursor-pointer">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
