"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { BadgeFooter } from "@/components/navigation/badge-footer"
import { 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  GitBranch,
  Network,
  Workflow,
  Share2,
  Download,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

const VISUALIZATION_TYPES = [
  { id: "flowchart", name: "Flowchart", icon: Workflow },
  { id: "mindmap", name: "Mind Map", icon: Share2 },
  { id: "sequence", name: "Sequence Diagram", icon: GitBranch },
  { id: "network", name: "Network Diagram", icon: Network },
  { id: "er", name: "ER Diagram", icon: BarChart3 },
  { id: "gantt", name: "Gantt Chart", icon: BarChart3 },
]

const SAMPLE_MERMAID = `graph TD
    A[Client] -->|HTTPS| B[Load Balancer]
    B --> C[Web Server 1]
    B --> D[Web Server 2]
    C --> E[Database]
    D --> E
    E --> F[Cache Layer]
    F --> G[Storage]`

export default function VisualizationsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedType, setSelectedType] = useState("flowchart")
  const [mermaidCode, setMermaidCode] = useState(SAMPLE_MERMAID)

  const handleExport = (format: string) => {
    console.log(`[v0] Exporting as ${format}`)
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-16 md:ml-64 mt-24 p-6 transition-all duration-300">
        <div className="flex gap-6 h-[calc(100vh-150px)]">
          {/* Left Sidebar - Visualization Types */}
          <aside className={cn(
            "glass-panel rounded-lg border border-cyan-500/20 transition-all duration-300 overflow-hidden",
            isCollapsed ? "w-12" : "w-64"
          )}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute left-2 top-2 z-50 w-6 h-6 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {!isCollapsed && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-mono font-bold text-cyan-300">Diagram Types</h2>
                </div>

                <button
                  className="w-full mb-4 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2 justify-center"
                >
                  <Plus className="w-4 h-4" />
                  New Diagram
                </button>

                <div className="space-y-1">
                  {VISUALIZATION_TYPES.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors flex items-center gap-2",
                          selectedType === type.id
                            ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                            : "hover:bg-cyan-500/5 text-slate-300"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {type.name}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-cyan-500/20">
                  <h3 className="text-xs font-mono text-slate-400 mb-2">Export Options</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleExport("svg")}
                      className="w-full px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/5 rounded transition-colors text-left"
                    >
                      Export as SVG
                    </button>
                    <button
                      onClick={() => handleExport("png")}
                      className="w-full px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/5 rounded transition-colors text-left"
                    >
                      Export as PNG
                    </button>
                    <button
                      onClick={() => handleExport("pdf")}
                      className="w-full px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/5 rounded transition-colors text-left"
                    >
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex gap-6">
            {/* Editor */}
            <div className="w-1/2 glass-panel rounded-lg border border-cyan-500/20 flex flex-col">
              <div className="border-b border-cyan-500/20 p-4">
                <h2 className="text-lg font-mono font-bold text-cyan-300">Mermaid Code</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">Edit your diagram using Mermaid syntax</p>
              </div>
              <div className="flex-1 p-4">
                <textarea
                  value={mermaidCode}
                  onChange={(e) => setMermaidCode(e.target.value)}
                  className="w-full h-full bg-slate-800/30 border border-cyan-500/20 rounded p-4 font-mono text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 resize-none"
                  placeholder="Enter Mermaid diagram code..."
                />
              </div>
              <div className="border-t border-cyan-500/20 p-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-cyan-400">Syntax:</span>
                  <code>graph TD, sequenceDiagram, classDiagram, etc.</code>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="w-1/2 glass-panel rounded-lg border border-cyan-500/20 flex flex-col">
              <div className="border-b border-cyan-500/20 p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-mono font-bold text-cyan-300">Preview</h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">Live diagram rendering</p>
                </div>
                <button
                  onClick={() => handleExport("svg")}
                  className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                >
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
              <div className="flex-1 p-6 overflow-auto flex items-center justify-center">
                <div className="glass-panel border border-cyan-500/20 rounded-lg p-8 bg-slate-900/50">
                  {/* Mermaid diagram would render here */}
                  <div className="text-center">
                    <Network className="w-64 h-64 text-cyan-400/20 mx-auto mb-4" />
                    <p className="text-sm font-mono text-slate-400">
                      Diagram preview will render here
                    </p>
                    <p className="text-xs font-mono text-slate-500 mt-2">
                      Install mermaid.js for live rendering
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-cyan-500/20 p-4">
                <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <p className="text-slate-500">Nodes</p>
                    <p className="text-cyan-300">7</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Edges</p>
                    <p className="text-cyan-300">6</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Depth</p>
                    <p className="text-cyan-300">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="mt-6 glass-panel rounded-lg border border-cyan-500/20 p-6">
          <h2 className="text-lg font-mono font-bold text-cyan-300 mb-4">Quick Templates</h2>
          <div className="grid grid-cols-4 gap-4">
            {["System Architecture", "CI/CD Pipeline", "Database Schema", "API Flow"].map((template) => (
              <button
                key={template}
                className="p-4 bg-slate-800/30 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors"
              >
                <Workflow className="w-6 h-6 text-cyan-400 mb-2" />
                <p className="text-sm font-mono text-slate-300">{template}</p>
              </button>
            ))}
          </div>
        </div>
      </main>

      <BadgeFooter />
    </div>
  )
}
