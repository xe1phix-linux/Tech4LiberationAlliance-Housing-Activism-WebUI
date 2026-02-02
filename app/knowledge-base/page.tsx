"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { BadgeFooter } from "@/components/navigation/badge-footer"
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Save, 
  Search, 
  FileText,
  Sparkles,
  List
} from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "Linux Administration",
  "Security & Privacy",
  "Networking",
  "Programming",
  "Docker & Containers",
  "DevOps",
  "Databases",
  "Cloud Computing",
  "Web Development",
  "Cryptography",
]

const SAMPLE_ARTICLES = [
  { id: 1, title: "Firejail Sandboxing Guide", category: "Security & Privacy", content: "# Firejail Sandboxing Guide\n\n## Overview\nFirejail is a SUID security sandbox program..." },
  { id: 2, title: "Docker Best Practices", category: "Docker & Containers", content: "# Docker Best Practices\n\n## Container Optimization\nKeep containers lightweight..." },
  { id: 3, title: "PostgreSQL Performance Tuning", category: "Databases", content: "# PostgreSQL Performance Tuning\n\n## Configuration\nOptimize your postgresql.conf..." },
]

export default function KnowledgeBasePage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArticle, setSelectedArticle] = useState(SAMPLE_ARTICLES[0])
  const [showToc, setShowToc] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const handleImport = () => {
    // Trigger file upload
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.txt'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log('[v0] Importing file:', file.name)
        // Handle file import
      }
    }
    input.click()
  }

  const handleSave = () => {
    console.log('[v0] Saving article to knowledge base')
    // Handle save logic
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
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-mono font-bold text-cyan-300">Categories</h2>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
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
                    All Articles
                  </button>
                  {CATEGORIES.map((category) => (
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
              <h1 className="text-xl font-mono font-bold text-cyan-300">Knowledge Base</h1>
              <div className="flex gap-2">
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

            {/* Article Content */}
            <div className="flex-1 overflow-y-auto p-6 relative">
              {/* Table of Contents Toggle */}
              {showToc && (
                <div className="absolute right-6 top-6 w-64 glass-panel border border-cyan-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <List className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-mono font-bold text-cyan-300">Table of Contents</h3>
                    </div>
                    <button
                      onClick={() => setShowToc(false)}
                      className="text-slate-400 hover:text-cyan-400"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <a href="#overview" className="block text-slate-300 hover:text-cyan-400 transition-colors">Overview</a>
                    <a href="#installation" className="block text-slate-300 hover:text-cyan-400 transition-colors pl-2">Installation</a>
                    <a href="#configuration" className="block text-slate-300 hover:text-cyan-400 transition-colors pl-2">Configuration</a>
                    <a href="#usage" className="block text-slate-300 hover:text-cyan-400 transition-colors">Usage</a>
                    <a href="#examples" className="block text-slate-300 hover:text-cyan-400 transition-colors pl-2">Examples</a>
                  </div>
                </div>
              )}

              {!showToc && (
                <button
                  onClick={() => setShowToc(true)}
                  className="absolute right-6 top-6 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                >
                  <List className="w-4 h-4" />
                  ToC
                </button>
              )}

              <article className="prose prose-invert prose-cyan max-w-none">
                <div className="markdown-content">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300">
                    {selectedArticle.content}
                  </pre>
                </div>
              </article>
            </div>

            {/* AI Summary Section */}
            <div className="border-t border-cyan-500/20 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-sm font-mono font-bold text-purple-300 mb-2">AI Summary</h3>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    This article covers essential sandboxing techniques using Firejail. Key topics include 
                    installation, basic configuration, profile customization, and security best practices. 
                    Recommended for users looking to enhance application isolation on Linux systems.
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
