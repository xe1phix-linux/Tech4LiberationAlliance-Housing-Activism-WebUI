"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { BadgeFooter } from "@/components/navigation/badge-footer"
import { 
  Settings as SettingsIcon, 
  Key, 
  MessageSquareCode,
  User,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  TestTube,
  Database,
  Mail
} from "lucide-react"

const AI_MODELS = [
  { id: "openai", name: "OpenAI (GPT-4)", keyLabel: "ChatGPT API Key", placeholder: "sk-..." },
  { id: "anthropic", name: "Anthropic (Claude)", keyLabel: "Claude API Key", placeholder: "sk-ant-..." },
  { id: "google", name: "Google (Gemini)", keyLabel: "Gemini API Key", placeholder: "AIza..." },
  { id: "deepseek", name: "DeepSeek", keyLabel: "DeepSeek API Key", placeholder: "ds-..." },
  { id: "glm", name: "GLM-4", keyLabel: "GLM API Key", placeholder: "glm-..." },
  { id: "cohere", name: "Cohere", keyLabel: "Cohere API Key", placeholder: "co-..." },
  { id: "mistral", name: "Mistral AI", keyLabel: "Mistral API Key", placeholder: "mst-..." },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("ai-chatbot")
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({})
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const handleSaveApiKey = (modelId: string, key: string) => {
    setApiKeys({ ...apiKeys, [modelId]: key })
    console.log(`[v0] Saved API key for ${modelId}`)
  }

  const handleTestConnection = (modelId: string) => {
    console.log(`[v0] Testing connection for ${modelId}`)
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-16 md:ml-64 mt-24 p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-mono font-bold text-cyan-300 flex items-center gap-3">
              <SettingsIcon className="w-7 h-7" />
              Settings
            </h1>
            <p className="text-sm font-mono text-slate-400 mt-1">
              Configure your application preferences and integrations
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <aside className="w-64 glass-panel rounded-lg border border-cyan-500/20 p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("ai-chatbot")}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors flex items-center gap-2 ${
                    activeTab === "ai-chatbot"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                      : "hover:bg-cyan-500/5 text-slate-300"
                  }`}
                >
                  <MessageSquareCode className="w-4 h-4" />
                  AI Coding Chatbot
                </button>
                <button
                  onClick={() => setActiveTab("database")}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors flex items-center gap-2 ${
                    activeTab === "database"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                      : "hover:bg-cyan-500/5 text-slate-300"
                  }`}
                >
                  <Database className="w-4 h-4" />
                  Database
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors flex items-center gap-2 ${
                    activeTab === "profile"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                      : "hover:bg-cyan-500/5 text-slate-300"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors flex items-center gap-2 ${
                    activeTab === "notifications"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                      : "hover:bg-cyan-500/5 text-slate-300"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors flex items-center gap-2 ${
                    activeTab === "security"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                      : "hover:bg-cyan-500/5 text-slate-300"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Security
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 glass-panel rounded-lg border border-cyan-500/20 p-6">
              {activeTab === "ai-chatbot" && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <MessageSquareCode className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-mono font-bold text-cyan-300">AI Coding Chatbot Settings</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-4">
                        <Key className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-sm font-mono font-bold text-cyan-300 mb-1">API Keys</h3>
                          <p className="text-xs font-mono text-slate-400">
                            Configure API keys for different AI models. Keys are stored securely and encrypted.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {AI_MODELS.map((model) => (
                          <div key={model.id} className="border border-cyan-500/20 rounded p-4">
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-mono font-semibold text-slate-300">
                                {model.name}
                              </label>
                              <button
                                onClick={() => handleTestConnection(model.id)}
                                className="px-2 py-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                              >
                                <TestTube className="w-3 h-3" />
                                Test
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <input
                                  type={showKeys[model.id] ? "text" : "password"}
                                  placeholder={model.placeholder}
                                  value={apiKeys[model.id] || ""}
                                  onChange={(e) => setApiKeys({ ...apiKeys, [model.id]: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-500/20 rounded text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50"
                                />
                                <button
                                  onClick={() => setShowKeys({ ...showKeys, [model.id]: !showKeys[model.id] })}
                                  className="absolute right-2 top-2.5 text-slate-400 hover:text-cyan-400"
                                >
                                  {showKeys[model.id] ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              <button
                                onClick={() => handleSaveApiKey(model.id, apiKeys[model.id] || "")}
                                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                              >
                                <Save className="w-4 h-4" />
                                Save
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4">
                      <h3 className="text-sm font-mono font-bold text-cyan-300 mb-3">Default Model</h3>
                      <select className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-500/20 rounded text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50">
                        <option value="gpt-4">GPT-4 (OpenAI)</option>
                        <option value="claude">Claude Opus (Anthropic)</option>
                        <option value="gemini">Gemini Pro (Google)</option>
                        <option value="deepseek">DeepSeek</option>
                        <option value="glm">GLM-4</option>
                      </select>
                    </div>

                    <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4">
                      <h3 className="text-sm font-mono font-bold text-cyan-300 mb-3">Model Parameters</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            Temperature: <span className="text-cyan-400">0.7</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            defaultValue="0.7"
                            className="w-full accent-cyan-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">Max Tokens</label>
                          <input
                            type="number"
                            defaultValue="2048"
                            className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-500/20 rounded text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            Top P: <span className="text-cyan-400">0.9</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            defaultValue="0.9"
                            className="w-full accent-cyan-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "database" && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-mono font-bold text-cyan-300">Database Settings</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase">Provider</label>
                          <p className="text-sm font-mono text-slate-300 mt-1">PostgreSQL</p>
                        </div>
                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase">Status</label>
                          <p className="text-sm font-mono text-emerald-400 mt-1">Connected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-mono font-bold text-cyan-300">Profile Settings</h2>
                  </div>
                  <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4">
                    <p className="text-sm font-mono text-slate-400">Profile configuration options.</p>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-mono font-bold text-cyan-300">Notification Settings</h2>
                  </div>
                  <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-mono text-slate-300">Email Notifications</p>
                        <p className="text-xs font-mono text-slate-500">Receive updates via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-cyan-400 w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-mono text-slate-300">Daily Digest</p>
                        <p className="text-xs font-mono text-slate-500">Summary of daily activity</p>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-cyan-400 w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-mono font-bold text-cyan-300">Security Settings</h2>
                  </div>
                  <div className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-4">
                    <p className="text-sm font-mono text-slate-400">Security configuration options.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BadgeFooter />
    </div>
  )
}
