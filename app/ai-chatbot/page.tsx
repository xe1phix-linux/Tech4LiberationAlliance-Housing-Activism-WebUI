"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { BadgeFooter } from "@/components/navigation/badge-footer"
import { 
  MessageSquareCode, 
  Send, 
  Sparkles,
  Code,
  Settings as SettingsIcon,
  Trash2,
  Copy
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI coding assistant. I can help you with:\n- Code generation and completion\n- Debugging and troubleshooting\n- Code review and optimization\n- Documentation writing\n- Architecture suggestions\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [showSettings, setShowSettings] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "I understand your request. Let me help you with that...\n\n```typescript\n// Sample code response\nfunction example() {\n  console.log('AI generated code');\n}\n```\n\nIs there anything specific you'd like me to explain or modify?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const handleClearChat = () => {
    setMessages([{
      id: 1,
      role: "assistant",
      content: "Chat cleared. How can I help you?",
      timestamp: new Date()
    }])
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-16 md:ml-64 mt-24 p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto h-[calc(100vh-150px)] flex flex-col">
          {/* Header */}
          <div className="glass-panel rounded-t-lg border border-b-0 border-cyan-500/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquareCode className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-mono font-bold text-cyan-300">AI Coding Chatbot</h1>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 border border-cyan-500/20 rounded text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/50"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="claude">Claude Opus</option>
                <option value="deepseek">DeepSeek</option>
                <option value="gemini">Gemini Pro</option>
                <option value="glm">GLM-4</option>
              </select>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 transition-colors"
              >
                <SettingsIcon className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-2 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="glass-panel border-x border-cyan-500/20 p-4">
              <h3 className="text-sm font-mono font-bold text-cyan-300 mb-3">Chat Settings</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Temperature</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.7"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Max Tokens</label>
                  <input
                    type="number"
                    defaultValue="2048"
                    className="w-full px-2 py-1 bg-slate-800/50 border border-cyan-500/20 rounded text-sm font-mono text-cyan-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Top P</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="0.9"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 glass-panel border-x border-cyan-500/20 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-4",
                    message.role === "user"
                      ? "bg-cyan-500/10 border border-cyan-500/30"
                      : "bg-slate-800/50 border border-cyan-500/20"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === "assistant" && (
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    )}
                    <span className="text-xs font-mono text-slate-400">
                      {message.role === "user" ? "You" : "AI Assistant"}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300">
                    {message.content}
                  </pre>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => navigator.clipboard.writeText(message.content)}
                      className="mt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="glass-panel rounded-b-lg border border-t-0 border-cyan-500/20 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about coding..."
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-cyan-300">Send</span>
              </button>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <Code className="w-3 h-3" />
                <span>Code completion enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                <span>Context: Last 10 messages</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BadgeFooter />
    </div>
  )
}
