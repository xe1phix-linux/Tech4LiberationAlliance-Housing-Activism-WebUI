import * as React from "react"
import { cn } from "@/lib/utils"

interface NeonBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "magenta" | "green" | "amber" | "red"
  pulse?: boolean
}

const NeonBadge = React.forwardRef<HTMLSpanElement, NeonBadgeProps>(
  ({ className, variant = "cyan", pulse = false, children, ...props }, ref) => {
    const variantStyles = {
      cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
      magenta: "bg-pink-500/20 text-pink-300 border-pink-500/40 shadow-[0_0_10px_rgba(255,0,150,0.3)]",
      green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,150,0.3)]",
      amber: "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(255,170,0,0.3)]",
      red: "bg-red-500/20 text-red-300 border-red-500/40 shadow-[0_0_10px_rgba(255,50,50,0.3)]",
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border",
          variantStyles[variant],
          pulse && "animate-pulse-glow",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)
NeonBadge.displayName = "NeonBadge"

export { NeonBadge }
