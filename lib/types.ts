// FairGuard AI Type Definitions

export interface DashboardStats {
  totalEmailsAnalyzed: number
  totalViolationsDetected: number
  highRiskCases: number
  averageRiskScore: number
  complianceRate: number
  pendingReview: number
}

export interface EmailThread {
  id: string
  subject: string
  participants: string[]
  propertyAddress: string
  censusTract: string
  startDate: Date
  lastActivity: Date
  messageCount: number
  overallRiskScore: number
  status: "pending" | "reviewed" | "flagged" | "cleared"
  violations: ViolationSummary[]
}

export interface ViolationSummary {
  id: string
  type: string
  protectedClass: string
  severity: "low" | "medium" | "high" | "critical"
  statute: string
  timestamp: Date
}

export interface PropertyData {
  address: string
  censusTract: string
  totalEmails: number
  totalViolations: number
  riskScore: number
  lastAudit: Date
}

export interface AgentPerformance {
  agentId: string
  agentName: string
  emailsProcessed: number
  violations: number
  avgResponseTime: number
  complianceScore: number
}

export interface LatencyDataPoint {
  category: string
  avgLatency: number
  sampleSize: number
  outlierCount: number
}

export interface ComplianceGauge {
  category: string
  score: number
  target: number
  trend: "up" | "down" | "stable"
}

export interface FilterState {
  propertyAddress: string
  dateRange: { from: Date; to: Date }
  riskLevel: ("low" | "medium" | "high" | "critical")[]
  violationType: string[]
  agentId: string
}
