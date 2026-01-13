"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, HardDrive, Cloud, Droplet, FolderOpen } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onFileSelect: (files: File[], source: string) => void
}

export function UploadModal({ isOpen, onClose, onFileSelect }: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<string>("local")
  const [isDragging, setIsDragging] = useState(false)

  if (!isOpen) return null

  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(Array.from(e.target.files), "local")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      onFileSelect(Array.from(e.dataTransfer.files), "local")
    }
  }

  const handleCloudAuth = (provider: string) => {
    // Open OAuth window for cloud provider
    const authUrls: Record<string, string> = {
      mega: "https://mega.nz/login",
      drive:
        "https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT&scope=https://www.googleapis.com/auth/drive.readonly&response_type=code",
      dropbox: "https://www.dropbox.com/oauth2/authorize?client_id=YOUR_APP_KEY&response_type=code",
    }

    if (authUrls[provider]) {
      window.open(authUrls[provider], "_blank", "width=600,height=700")
    }
  }

  const uploadSources = [
    { id: "local", name: "Local", icon: FolderOpen, color: "text-emerald-400", bgHover: "hover:bg-emerald-500/10" },
    { id: "mega", name: "Mega", icon: HardDrive, color: "text-red-400", bgHover: "hover:bg-red-500/10" },
    { id: "drive", name: "Drive", icon: Cloud, color: "text-blue-400", bgHover: "hover:bg-blue-500/10" },
    { id: "dropbox", name: "Dropbox", icon: Droplet, color: "text-sky-400", bgHover: "hover:bg-sky-500/10" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <GlassCard className="w-full max-w-xl mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-mono font-bold text-cyan-300">UPLOAD COMMUNICATIONS</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-pink-500/20 transition-colors cursor-pointer">
            <X className="w-5 h-5 text-pink-400" />
          </button>
        </div>

        {/* Tab Buttons - Left to Right */}
        <div className="flex border-b border-cyan-500/20">
          {uploadSources.map((source) => {
            const Icon = source.icon
            const isActive = activeTab === source.id
            return (
              <button
                key={source.id}
                onClick={() => setActiveTab(source.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-mono text-sm transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/10 border-b-2 border-cyan-400 text-cyan-300"
                    : `text-slate-400 ${source.bgHover}`
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? source.color : ""}`} />
                {source.name}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "local" ? (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                isDragging ? "border-cyan-400 bg-cyan-500/10" : "border-cyan-500/30 hover:border-cyan-500/50"
              }`}
            >
              <FolderOpen className="w-12 h-12 text-cyan-400/60 mx-auto mb-4" />
              <p className="text-sm font-mono text-slate-300 mb-2">Drag & drop files here, or click to browse</p>
              <p className="text-xs font-mono text-slate-500 mb-4">Supported: .eml, .msg, .mbox, .pdf, .txt, .csv</p>
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept=".eml,.msg,.mbox,.pdf,.txt,.csv"
                  onChange={handleLocalUpload}
                  className="hidden"
                />
                <span className="px-4 py-2 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-sm hover:bg-cyan-500/30 transition-colors cursor-pointer border border-cyan-500/30">
                  Browse Files
                </span>
              </label>
            </div>
          ) : (
            <div className="text-center py-8">
              {uploadSources
                .filter((s) => s.id === activeTab)
                .map((source) => {
                  const Icon = source.icon
                  return (
                    <div key={source.id}>
                      <Icon className={`w-16 h-16 ${source.color} mx-auto mb-4 opacity-60`} />
                      <p className="text-sm font-mono text-slate-300 mb-4">Connect to {source.name} to import files</p>
                      <button
                        onClick={() => handleCloudAuth(source.id)}
                        className={`px-6 py-2.5 rounded-md font-mono text-sm transition-all cursor-pointer border ${
                          source.id === "mega"
                            ? "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30"
                            : source.id === "drive"
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30"
                              : "bg-sky-500/20 text-sky-300 border-sky-500/30 hover:bg-sky-500/30"
                        }`}
                      >
                        Authenticate with {source.name}
                      </button>
                    </div>
                  )
                })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-slate-900/30">
          <p className="text-xs font-mono text-slate-500 text-center">
            Files are encrypted and processed locally. SOC2 compliant.
          </p>
        </div>
      </GlassCard>
    </div>
  )
}
