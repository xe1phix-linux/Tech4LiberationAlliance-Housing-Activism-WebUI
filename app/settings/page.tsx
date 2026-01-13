import { Sidebar } from "@/components/dashboard/sidebar"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonBadge } from "@/components/ui/neon-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Database, Mail, Shield, Bell, RefreshCw, Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />

      <main className="ml-64 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-mono font-bold neon-text-cyan animate-flicker">SYSTEM SETTINGS</h1>
          <p className="text-sm font-mono text-slate-400 mt-1">Configure FairGuard AI system parameters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gmail Integration */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
              <Mail className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-mono font-semibold text-cyan-300">Gmail Integration</h2>
              <NeonBadge variant="green" className="ml-auto">
                CONNECTED
              </NeonBadge>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">Connected Account</label>
                <Input
                  value="compliance@propertymanagement.com"
                  disabled
                  className="mt-1 bg-slate-900/50 border-slate-700 text-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">Sync Frequency</label>
                <select className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-md px-3 py-2 text-sm font-mono text-slate-300 focus:border-cyan-400 focus:outline-none">
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-500">Last sync: 5 minutes ago</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-mono"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Database Configuration */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
              <Database className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-mono font-semibold text-cyan-300">Database</h2>
              <NeonBadge variant="green" className="ml-auto">
                HEALTHY
              </NeonBadge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Provider</label>
                  <p className="text-sm font-mono text-slate-300 mt-1">PostgreSQL (Neon)</p>
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Vector DB</label>
                  <p className="text-sm font-mono text-slate-300 mt-1">Pinecone</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Emails Stored</label>
                  <p className="text-lg font-mono font-bold text-cyan-400 mt-1">12,847</p>
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase">Vectors Indexed</label>
                  <p className="text-lg font-mono font-bold text-cyan-400 mt-1">38,541</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* AI Configuration */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-mono font-semibold text-cyan-300">AI Analysis</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">Analysis Model</label>
                <select className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-md px-3 py-2 text-sm font-mono text-slate-300 focus:border-cyan-400 focus:outline-none">
                  <option>claude-sonnet-4-20250514 (Recommended)</option>
                  <option>gpt-4o</option>
                  <option>gpt-4-turbo</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">Confidence Threshold</label>
                <div className="flex items-center gap-4 mt-1">
                  <input type="range" min="50" max="95" defaultValue="75" className="flex-1 accent-cyan-400" />
                  <span className="text-sm font-mono text-cyan-400 w-12">75%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="cot" defaultChecked className="accent-cyan-400" />
                <label htmlFor="cot" className="text-sm font-mono text-slate-300">
                  Enable Chain-of-Thought reasoning
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pii" defaultChecked className="accent-cyan-400" />
                <label htmlFor="pii" className="text-sm font-mono text-slate-300">
                  Auto-redact PII before analysis
                </label>
              </div>
            </div>
          </GlassCard>

          {/* Notification Settings */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cyan-500/20">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-mono font-semibold text-cyan-300">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-slate-300">Critical Violations</p>
                  <p className="text-xs font-mono text-slate-500">Immediate alert on critical findings</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-cyan-400 w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-slate-300">Daily Digest</p>
                  <p className="text-xs font-mono text-slate-500">Summary of all findings</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-cyan-400 w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-slate-300">Compliance Score Alerts</p>
                  <p className="text-xs font-mono text-slate-500">Alert when score drops below threshold</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-cyan-400 w-5 h-5" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">Alert Email</label>
                <Input
                  defaultValue="legal@propertymanagement.com"
                  className="mt-1 bg-slate-900/50 border-slate-700 text-slate-300 font-mono"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 font-mono">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </main>
    </div>
  )
}
