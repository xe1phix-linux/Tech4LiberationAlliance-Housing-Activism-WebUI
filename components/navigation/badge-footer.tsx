import { SOCIAL_LINKS } from "@/lib/social-links"

export function BadgeFooter() {
  return (
    <footer className="w-full bg-slate-900/80 backdrop-blur-sm border-t border-cyan-500/20 py-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 hover:opacity-80 transition-all duration-200"
                title={link.name}
              >
                <div className={`w-12 h-12 rounded-full bg-slate-800/50 border border-cyan-500/20 flex items-center justify-center transition-all duration-200 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]`}>
                  <Icon className={`w-6 h-6 ${link.iconColor} transition-transform group-hover:scale-110`} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  {link.name.split(' - ')[0]}
                </span>
              </a>
            )
          })}
        </div>
        <div className="text-center text-xs font-mono text-slate-500">
          <p>© 2024 Xe1phix | Tech 4 Liberation Alliance</p>
        </div>
      </div>
    </footer>
  )
}
