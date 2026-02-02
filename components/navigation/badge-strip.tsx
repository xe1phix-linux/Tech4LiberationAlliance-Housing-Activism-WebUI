"use client"

import { useState } from "react"
import { SOCIAL_LINKS } from "@/lib/social-links"

export function BadgeStrip() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-cyan-500/20 px-4 overflow-x-auto scrollbar-thin transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ 
        maxHeight: isExpanded ? "200px" : "40px",
        paddingTop: isExpanded ? "12px" : "8px",
        paddingBottom: isExpanded ? "12px" : "8px"
      }}
    >
      <div className={`flex items-center justify-center gap-2 transition-all duration-300 ${isExpanded ? 'flex-wrap' : 'flex-nowrap overflow-x-auto'}`}>
        {SOCIAL_LINKS.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-all duration-200 group"
              title={link.name}
            >
              {isExpanded && (
                <Icon className={`w-4 h-4 ${link.iconColor} transition-transform group-hover:scale-110`} />
              )}
              <img src={link.badge || "/placeholder.svg"} alt={`${link.name} badge`} className="h-5" />
              {isExpanded && link.extraBadges?.map((badge, i) => (
                <img key={i} src={badge || "/placeholder.svg"} alt={`${link.name} badge ${i + 1}`} className="h-5" />
              ))}
            </a>
          )
        })}
      </div>
    </div>
  )
}
