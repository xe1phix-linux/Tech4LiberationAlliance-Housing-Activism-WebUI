// FairGuard AI - Chain of Thought Analysis Engine
// Uses structured reasoning for violation detection and severity grading

import {
  type ProtectedClass,
  type RiskSeverity,
  type LegalViolation,
  DISCRIMINATORY_PATTERNS,
  STATUTE_REFERENCES,
  getJurisdiction,
  getRemediationSuggestion,
  calculateLitigationRisk,
} from "./legal-logic"

export interface ChainOfThoughtStep {
  step: number
  reasoning: string
  evidence: string[]
  conclusion: string
}

export interface AIAnalysisResult {
  emailId: string
  chainOfThought: ChainOfThoughtStep[]
  detectedViolations: LegalViolation[]
  overallSeverity: RiskSeverity
  confidenceScore: number
  litigationRiskScore: number
  suggestedActions: string[]
  processingTimeMs: number
}

export interface EmailContent {
  id: string
  subject: string
  body: string
  from: string
  to: string
  timestamp: Date
  threadId: string
  propertyAddress?: string
  responseLatencyMinutes?: number
}

// PII Redaction patterns for SOC2 compliance
const PII_PATTERNS = [
  { pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, replacement: "[PHONE_REDACTED]" },
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: "[EMAIL_REDACTED]" },
  { pattern: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g, replacement: "[SSN_REDACTED]" },
  { pattern: /\b\d{5}(?:[-\s]\d{4})?\b/g, replacement: "[ZIP_REDACTED]" },
  { pattern: /\b(?:Mr\.|Mrs\.|Ms\.|Dr\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g, replacement: "[NAME_REDACTED]" },
]

// Redact PII from text before analysis
export function redactPII(text: string): { redactedText: string; redactionCount: number } {
  let redactedText = text
  let redactionCount = 0

  for (const { pattern, replacement } of PII_PATTERNS) {
    const matches = redactedText.match(pattern)
    if (matches) {
      redactionCount += matches.length
      redactedText = redactedText.replace(pattern, replacement)
    }
  }

  return { redactedText, redactionCount }
}

// Chain of Thought violation analysis
export function analyzeEmailWithCoT(email: EmailContent): AIAnalysisResult {
  const startTime = Date.now()
  const chainOfThought: ChainOfThoughtStep[] = []
  const detectedViolations: LegalViolation[] = []
  const evidence: string[] = []

  // Step 1: PII Redaction
  const { redactedText, redactionCount } = redactPII(`${email.subject} ${email.body}`)
  chainOfThought.push({
    step: 1,
    reasoning: "First, redact PII for SOC2 compliance before analysis",
    evidence: [`Redacted ${redactionCount} PII elements from email content`],
    conclusion: "Content sanitized for privacy-preserving analysis",
  })

  // Step 2: Pattern Matching Analysis
  const patternMatches: Array<{ pattern: (typeof DISCRIMINATORY_PATTERNS)[0]; matches: string[] }> = []

  for (const pattern of DISCRIMINATORY_PATTERNS) {
    const matches = redactedText.match(pattern.pattern)
    if (matches) {
      patternMatches.push({ pattern, matches })
    }
  }

  chainOfThought.push({
    step: 2,
    reasoning: "Scan content against known discriminatory language patterns",
    evidence: patternMatches.map((pm) => `Found "${pm.matches.join(", ")}" matching ${pm.pattern.explanation}`),
    conclusion:
      patternMatches.length > 0
        ? `Detected ${patternMatches.length} potential pattern violations`
        : "No pattern matches detected",
  })

  // Step 3: Generate violations from pattern matches
  for (const { pattern, matches } of patternMatches) {
    const jurisdiction = getJurisdiction(pattern.protectedClass)
    const statuteKey = getStatuteKey(pattern.protectedClass)
    const statute = STATUTE_REFERENCES[statuteKey]

    const violation: LegalViolation = {
      id: `VIO-${email.id}-${Date.now()}`,
      type: pattern.violationType,
      protectedClass: pattern.protectedClass,
      jurisdiction,
      statute: statute?.code || "Unknown",
      statuteText: statute?.description || pattern.explanation,
      confidence: calculatePatternConfidence(matches, pattern),
      severity: pattern.severity,
      evidence: matches,
      suggestedRemediation: "",
      litigationRiskScore: 0,
    }

    violation.suggestedRemediation = getRemediationSuggestion(violation)
    detectedViolations.push(violation)
    evidence.push(...matches)
  }

  // Step 4: Response Latency Analysis
  if (email.responseLatencyMinutes !== undefined) {
    const latencyAnalysis = analyzeResponseLatency(email.responseLatencyMinutes, email)

    chainOfThought.push({
      step: 3,
      reasoning: "Analyze response time for potential disparate treatment indicators",
      evidence: [
        `Response latency: ${email.responseLatencyMinutes} minutes`,
        latencyAnalysis.isAnomalous ? `Anomaly detected: ${latencyAnalysis.reason}` : "Within normal parameters",
      ],
      conclusion: latencyAnalysis.isAnomalous
        ? "Response time suggests potential digital redlining"
        : "Response time within acceptable range",
    })

    if (latencyAnalysis.violation) {
      detectedViolations.push(latencyAnalysis.violation)
    }
  }

  // Step 5: Severity Grading
  const overallSeverity = calculateOverallSeverity(detectedViolations)
  const litigationRiskScore = calculateLitigationRisk(detectedViolations)

  chainOfThought.push({
    step: 4,
    reasoning: "Calculate overall severity and litigation risk based on cumulative violations",
    evidence: [
      `Total violations: ${detectedViolations.length}`,
      `Federal violations: ${detectedViolations.filter((v) => v.jurisdiction === "federal").length}`,
      `State violations: ${detectedViolations.filter((v) => v.jurisdiction === "state").length}`,
      `Local violations: ${detectedViolations.filter((v) => v.jurisdiction === "local").length}`,
    ],
    conclusion: `Overall severity: ${overallSeverity.toUpperCase()}, Litigation risk: ${litigationRiskScore}/100`,
  })

  // Step 6: Generate suggested actions
  const suggestedActions = generateSuggestedActions(detectedViolations, overallSeverity)

  chainOfThought.push({
    step: 5,
    reasoning: "Generate remediation recommendations based on violation types and severity",
    evidence: suggestedActions,
    conclusion: "Action plan generated for compliance remediation",
  })

  const processingTimeMs = Date.now() - startTime

  return {
    emailId: email.id,
    chainOfThought,
    detectedViolations,
    overallSeverity,
    confidenceScore: calculateConfidenceScore(detectedViolations),
    litigationRiskScore,
    suggestedActions,
    processingTimeMs,
  }
}

// Helper functions
function getStatuteKey(protectedClass: ProtectedClass): string {
  const mapping: Record<ProtectedClass, string> = {
    race: "fha_race",
    color: "fha_race",
    religion: "fha_race",
    sex: "fha_race",
    familial_status: "fha_familial",
    national_origin: "fha_race",
    disability: "fha_disability",
    source_of_income: "ors_source_income",
    sexual_orientation: "ors_sexual_orientation",
    gender_identity: "ors_sexual_orientation",
    marital_status: "ors_marital",
    criminal_history: "wc_criminal_history",
    credit_score: "wc_credit",
  }
  return mapping[protectedClass]
}

function calculatePatternConfidence(matches: string[], pattern: (typeof DISCRIMINATORY_PATTERNS)[0]): number {
  // Base confidence from severity
  const severityBase: Record<RiskSeverity, number> = {
    low: 0.5,
    medium: 0.65,
    high: 0.8,
    critical: 0.9,
  }

  let confidence = severityBase[pattern.severity]

  // Boost for multiple matches
  if (matches.length > 1) {
    confidence = Math.min(0.95, confidence + matches.length * 0.05)
  }

  return confidence
}

function analyzeResponseLatency(
  latencyMinutes: number,
  email: EmailContent,
): {
  isAnomalous: boolean
  reason: string
  violation: LegalViolation | null
} {
  // Define thresholds
  const STANDARD_THRESHOLD = 240 // 4 hours
  const SIGNIFICANT_DELAY = 480 // 8 hours
  const SEVERE_DELAY = 1440 // 24 hours

  if (latencyMinutes < STANDARD_THRESHOLD) {
    return { isAnomalous: false, reason: "Within normal response time", violation: null }
  }

  // Check for potential bias indicators in subject/content
  const lowerContent = `${email.subject} ${email.body}`.toLowerCase()
  const biasIndicators = [
    { pattern: /section\s*8|housing\s*choice|hcv|voucher/i, class: "source_of_income" as ProtectedClass },
    { pattern: /wheelchair|disability|ada|service\s*animal/i, class: "disability" as ProtectedClass },
  ]

  for (const indicator of biasIndicators) {
    if (indicator.pattern.test(lowerContent) && latencyMinutes >= SIGNIFICANT_DELAY) {
      const severity: RiskSeverity = latencyMinutes >= SEVERE_DELAY ? "high" : "medium"

      return {
        isAnomalous: true,
        reason: `Significant delay (${Math.round(latencyMinutes / 60)}h) for ${indicator.class} inquiry`,
        violation: {
          id: `VIO-LAT-${email.id}`,
          type: "response_latency_bias",
          protectedClass: indicator.class,
          jurisdiction: indicator.class === "source_of_income" ? "state" : "federal",
          statute: indicator.class === "source_of_income" ? "ORS 659A.421" : "42 U.S.C. § 3604",
          statuteText: `Potential digital redlining: ${Math.round(latencyMinutes / 60)} hour response delay`,
          confidence: Math.min(0.8, 0.5 + (latencyMinutes - STANDARD_THRESHOLD) / 1000),
          severity,
          evidence: [`Response latency: ${latencyMinutes} minutes for protected class inquiry`],
          suggestedRemediation:
            "Implement automated response systems to ensure equal treatment across all inquiry types",
          litigationRiskScore: severity === "high" ? 65 : 40,
        },
      }
    }
  }

  return { isAnomalous: false, reason: "Delay present but no protected class correlation detected", violation: null }
}

function calculateOverallSeverity(violations: LegalViolation[]): RiskSeverity {
  if (violations.length === 0) return "low"

  const severityOrder: RiskSeverity[] = ["low", "medium", "high", "critical"]
  const maxSeverity = violations.reduce((max, v) => {
    const currentIndex = severityOrder.indexOf(v.severity)
    const maxIndex = severityOrder.indexOf(max)
    return currentIndex > maxIndex ? v.severity : max
  }, "low" as RiskSeverity)

  // Escalate if multiple violations
  if (violations.length >= 3 && maxSeverity !== "critical") {
    const currentIndex = severityOrder.indexOf(maxSeverity)
    return severityOrder[Math.min(currentIndex + 1, 3)]
  }

  return maxSeverity
}

function calculateConfidenceScore(violations: LegalViolation[]): number {
  if (violations.length === 0) return 0

  const avgConfidence = violations.reduce((sum, v) => sum + v.confidence, 0) / violations.length
  return Math.round(avgConfidence * 100) / 100
}

function generateSuggestedActions(violations: LegalViolation[], severity: RiskSeverity): string[] {
  const actions: string[] = []

  if (violations.length === 0) {
    return ["No violations detected. Continue standard compliance monitoring."]
  }

  // Add unique remediations
  const uniqueRemediations = new Set(violations.map((v) => v.suggestedRemediation))
  actions.push(...uniqueRemediations)

  // Add severity-based escalation actions
  if (severity === "critical") {
    actions.push("ESCALATE: Immediate legal review required")
    actions.push("ESCALATE: Suspend agent pending investigation")
    actions.push("Document all evidence for potential litigation defense")
  } else if (severity === "high") {
    actions.push("Schedule mandatory fair housing training within 7 days")
    actions.push("Notify compliance officer for review")
  } else if (severity === "medium") {
    actions.push("Flag for quarterly compliance review")
  }

  return actions
}

// Few-shot examples for AI training reference
export const FEW_SHOT_EXAMPLES = [
  {
    input: "Sorry, we don't accept Section 8 vouchers at this property.",
    expectedOutput: {
      violationType: "discriminatory_language",
      protectedClass: "source_of_income",
      statute: "ORS 659A.421",
      severity: "critical",
      reasoning:
        "Explicit denial based on source of income (Section 8). Oregon law prohibits discrimination against housing voucher holders.",
    },
  },
  {
    input: "This is a quiet, family-friendly community. The schools nearby are excellent.",
    expectedOutput: {
      violationType: "steering",
      protectedClass: "familial_status",
      severity: "high",
      reasoning:
        "Language suggesting steering families toward or away from properties based on school quality or 'family-friendly' designation.",
    },
  },
  {
    input: "We require a 7-year criminal background check with no felonies.",
    expectedOutput: {
      violationType: "discriminatory_language",
      protectedClass: "criminal_history",
      statute: "Metro Code 10.01.030",
      severity: "medium",
      reasoning: "Washington County/Portland Metro limits criminal history lookback periods and screening criteria.",
    },
  },
  {
    input: "Thank you for your inquiry. The apartment is available. Would you like to schedule a viewing?",
    expectedOutput: {
      violationType: null,
      severity: "low",
      reasoning: "Standard inquiry response with no discriminatory indicators.",
    },
  },
]
