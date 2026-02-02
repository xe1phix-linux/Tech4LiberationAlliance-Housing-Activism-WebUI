"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { BadgeFooter } from "@/components/navigation/badge-footer"
import { 
  Library, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Save, 
  Search, 
  Copy,
  Sparkles,
  List,
  Tag
} from "lucide-react"
import { cn } from "@/lib/utils"

const PROMPT_CATEGORIES = [
  "Code Generation",
  "Debugging",
  "Documentation",
  "Code Review",
  "Refactoring",
  "Security Analysis",
  "Performance Optimization",
  "Testing",
  "Architecture Design",
  "API Development",
]

const SAMPLE_PROMPTS = [
  { 
    id: 1, 
    title: "Security Audit Prompt", 
    category: "Security Analysis", 
    tags: ["security", "audit", "vulnerability"],
    content: "# Security Audit Prompt\n\nAnalyze the following code for security vulnerabilities:\n- SQL injection risks\n- XSS vulnerabilities\n- Authentication issues\n- Authorization flaws\n- Data exposure\n\nProvide specific recommendations for each finding.",
    model: "GPT-4"
  },
  { 
    id: 2, 
    title: "Code Refactoring Assistant", 
    category: "Refactoring", 
    tags: ["refactor", "clean code", "optimization"],
    content: "# Code Refactoring Prompt\n\nRefactor this code following SOLID principles:\n1. Single Responsibility\n2. Open/Closed\n3. Liskov Substitution\n4. Interface Segregation\n5. Dependency Inversion\n\nExplain each change.",
    model: "Claude"
  },
]

export default function PromptLibraryPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrompt, setSelectedPrompt] = useState(SAMPLE_PROMPTS[0])
  const [showToc, setShowToc] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.txt,.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log('[v0] Importing prompt:', file.name)
      }
    }
    input.click()
  }

  const handleSave = () => {
    console.log('[v0] Saving prompt to library')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedPrompt.content)
    console.log('[v0] Copied prompt to clipboard')
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-16 md:ml-64 mt-24 p-6 transition-all duration-300">
        <div className="flex gap-6 h-[calc(100vh-150px)]">
          {/* Left Sidebar - Categories */}
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
                  <Library className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-mono font-bold text-cyan-300">Categories</h2>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-cyan-500/20 rounded text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors",
                      selectedCategory === "All"
                        ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                        : "hover:bg-cyan-500/5 text-slate-300"
                    )}
                  >
                    All Prompts
                  </button>
                  {PROMPT_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors",
                        selectedCategory === category
                          ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                          : "hover:bg-cyan-500/5 text-slate-300"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 glass-panel rounded-lg border border-cyan-500/20 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="border-b border-cyan-500/20 p-4 flex items-center justify-between">
              <h1 className="text-xl font-mono font-bold text-cyan-300">Prompt Library</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded text-sm font-mono text-purple-300 hover:bg-purple-500/20 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>

            {/* Prompt Content */}
            <div className="flex-1 overflow-y-auto p-6 relative">
              {/* Metadata Sidebar */}
              {showToc && (
                <div className="absolute right-6 top-6 w-64 glass-panel border border-cyan-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-mono font-bold text-cyan-300">Metadata</h3>
                    </div>
                    <button
                      onClick={() => setShowToc(false)}
                      className="text-slate-400 hover:text-cyan-400"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <p className="text-slate-500 mb-1">Category:</p>
                      <p className="text-cyan-300">{selectedPrompt.category}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Model:</p>
                      <p className="text-cyan-300">{selectedPrompt.model}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPrompt.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!showToc && (
                <button
                  onClick={() => setShowToc(true)}
                  className="absolute right-6 top-6 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  Info
                </button>
              )}

              <article className="prose prose-invert prose-cyan max-w-none pr-72">
                <h2 className="text-2xl font-mono font-bold text-cyan-300 mb-4">{selectedPrompt.title}</h2>
                <div className="markdown-content">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 bg-slate-800/30 p-4 rounded border border-cyan-500/20">
                    {selectedPrompt.content}
                  </pre>
                </div>
              </article>
            </div>

            {/* AI Usage Tips */}
            <div className="border-t border-cyan-500/20 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-sm font-mono font-bold text-purple-300 mb-2">AI Usage Tips</h3>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    This prompt works best with GPT-4 or Claude. Adjust temperature to 0.3 for more deterministic 
                    security analysis. Consider adding specific code context before the prompt for better results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BadgeFooter />
    </div>
  )
}
