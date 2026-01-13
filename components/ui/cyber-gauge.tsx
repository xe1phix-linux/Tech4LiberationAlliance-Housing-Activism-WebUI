"use client"
import { cn } from "@/lib/utils"

interface CyberGaugeProps {
  value: number
  max?: number
  label: string
  sublabel?: string
  size?: "sm" | "md" | "lg"
  variant?: "cyan" | "magenta" | "gradient"
  showPercentage?: boolean
  className?: string
}

export function CyberGauge({
  value,
  max = 100,
  label,
  sublabel,
  size = "md",
  variant = "cyan",
  showPercentage = true,
  className,
}: CyberGaugeProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75

  const sizeStyles = {
    sm: { width: 100, fontSize: "text-lg" },
    md: { width: 150, fontSize: "text-2xl" },
    lg: { width: 200, fontSize: "text-4xl" },
  }

  const colorStyles = {
    cyan: {
      stroke: "stroke-cyan-400",
      text: "text-cyan-400",
      glow: "drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]",
    },
    magenta: {
      stroke: "stroke-pink-400",
      text: "text-pink-400",
      glow: "drop-shadow-[0_0_10px_rgba(255,0,150,0.5)]",
    },
    gradient: {
      stroke: "stroke-[url(#gaugeGradient)]",
      text: "text-cyan-400",
      glow: "drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]",
    },
  }

  const { width, fontSize } = sizeStyles[size]
  const colors = colorStyles[variant]

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={width} height={width * 0.7} viewBox="0 0 100 70" className={cn("transform", colors.glow)}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ff0096" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M 10 60 A 45 45 0 0 1 90 60"
          fill="none"
          stroke="rgba(100, 116, 139, 0.3)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Value arc */}
        <path
          d="M 10 60 A 45 45 0 0 1 90 60"
          fill="none"
          className={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference * 0.75}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />

        {/* Center text */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className={cn("font-mono font-bold fill-current", colors.text, fontSize)}
        >
          {showPercentage ? `${Math.round(percentage)}%` : value}
        </text>
      </svg>

      <div className="text-center mt-2">
        <p className={cn("font-mono font-semibold", colors.text)}>{label}</p>
        {sublabel && <p className="text-xs text-slate-400 font-mono">{sublabel}</p>}
      </div>
    </div>
  )
}
