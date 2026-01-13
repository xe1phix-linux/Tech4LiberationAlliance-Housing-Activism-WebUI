import { SOCIAL_LINKS } from "@/lib/social-links"

export function BadgeStrip() {
  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-cyan-500/20 py-2 px-4 overflow-x-auto scrollbar-thin">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {SOCIAL_LINKS.map((link) => {
          // TryHackMe: render extra badge first, then main badge
          if (link.name === "TryHackMe" && link.extraBadges) {
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                {link.extraBadges.map((badge, i) => (
                  <img key={i} src={badge || "/placeholder.svg"} alt={`${link.name} badge ${i + 1}`} className="h-5" />
                ))}
                <img src={link.badge || "/placeholder.svg"} alt={`${link.name} badge`} className="h-5" />
              </a>
            )
          }

          // CodePen: render extra badges first, then main badge
          if (link.name === "CodePen" && link.extraBadges) {
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                {link.extraBadges.map((badge, i) => (
                  <img key={i} src={badge || "/placeholder.svg"} alt={`${link.name} badge ${i + 1}`} className="h-5" />
                ))}
                <img src={link.badge || "/placeholder.svg"} alt={`${link.name} badge`} className="h-5" />
              </a>
            )
          }

          // Standard badges
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={link.badge || "/placeholder.svg"} alt={`${link.name} badge`} className="h-5" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
