import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cyan" | "magenta" | "amber" | "neutral"
  glow?: boolean
  scanlines?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "cyan", glow = false, scanlines = false, children, ...props }, ref) => {
    const variantStyles = {
      cyan: "glass-panel",
      magenta: "glass-panel-magenta",
      amber: "bg-amber-950/40 backdrop-blur-xl border border-amber-500/20",
      neutral: "bg-slate-900/60 backdrop-blur-xl border border-slate-700/30",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-4",
          variantStyles[variant],
          glow && "shadow-[0_0_30px_rgba(0,255,255,0.15)]",
          scanlines && "scanline",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
