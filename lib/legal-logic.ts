// FairGuard AI - Oregon Legal Logic Framework
// Hierarchy: Federal FHA > Oregon ORS > Washington County Local

export type ProtectedClass =
  // Federal FHA Protected Classes
  | "race"
  | "color"
  | "religion"
  | "sex"
  | "familial_status"
  | "national_origin"
  | "disability"
  // Oregon ORS 659A.403 & 659A.421 Additional Classes
  | "source_of_income"
  | "sexual_orientation"
  | "gender_identity"
  | "marital_status"
  // Washington County Specific
  | "criminal_history"
  | "credit_score"

export type ViolationType =
  | "disparate_treatment"
  | "disparate_impact"
  | "steering"
  | "digital_redlining"
  | "discriminatory_language"
  | "response_latency_bias"

export type JurisdictionLevel = "federal" | "state" | "local"

export type RiskSeverity = "low" | "medium" | "high" | "critical"

export interface LegalViolation {
  id: string
  type: ViolationType
  protectedClass: ProtectedClass
  jurisdiction: JurisdictionLevel
  statute: string
  statuteText: string
  confidence: number
  severity: RiskSeverity
  evidence: string[]
  suggestedRemediation: string
  litigationRiskScore: number
}

export interface EmailAnalysis {
  id: string
  threadId: string
  subject: string
  from: string
  to: string
  timestamp: Date
  propertyAddress: string
  censusTract?: string
  responseLatencyMinutes: number
  violations: LegalViolation[]
  overallRiskScore: number
  piiRedacted: boolean
}

// Legal statute references
export const STATUTE_REFERENCES: Record<string, { code: string; title: string; description: string }> = {
  // Federal
  fha_race: {
    code: "42 U.S.C. § 3604(a)",
    title: "Fair Housing Act - Race Discrimination",
    description: "Prohibition against discrimination in sale or rental based on race",
  },
  fha_familial: {
    code: "42 U.S.C. § 3604(b)",
    title: "Fair Housing Act - Familial Status",
    description: "Prohibition against discrimination based on familial status",
  },
  fha_disability: {
    code: "42 U.S.C. § 3604(f)",
    title: "Fair Housing Act - Disability",
    description: "Prohibition against discrimination based on disability",
  },
  // Oregon State
  ors_source_income: {
    code: "ORS 659A.421",
    title: "Oregon Source of Income Protection",
    description: "Unlawful to discriminate based on source of income including Section 8 vouchers",
  },
  ors_sexual_orientation: {
    code: "ORS 659A.403",
    title: "Oregon Sexual Orientation Protection",
    description: "Unlawful to discriminate based on sexual orientation or gender identity",
  },
  ors_marital: {
    code: "ORS 659A.421(1)",
    title: "Oregon Marital Status Protection",
    description: "Unlawful to discriminate based on marital status",
  },
  // Washington County
  wc_criminal_history: {
    code: "Metro Code 10.01.030",
    title: "Portland Metro Criminal History Ordinance",
    description: "Restrictions on criminal history lookback periods and screening criteria",
  },
  wc_credit: {
    code: "Metro Code 10.01.040",
    title: "Portland Metro Credit Screening Limits",
    description: "Limitations on credit score thresholds for rental qualification",
  },
}

// Discriminatory phrase patterns
export const DISCRIMINATORY_PATTERNS: Array<{
  pattern: RegExp
  protectedClass: ProtectedClass
  violationType: ViolationType
  severity: RiskSeverity
  explanation: string
}> = [
  // Familial Status
  {
    pattern:
      /\b(no\s+kids?|no\s+children|adults?\s+only|family[- ]friendly|quiet\s+community|seniors?\s+preferred)\b/gi,
    protectedClass: "familial_status",
    violationType: "discriminatory_language",
    severity: "high",
    explanation: "Language indicating preference against families with children",
  },
  // Source of Income (Oregon Specific)
  {
    pattern:
      /\b(no\s+section\s*8|no\s+vouchers?|no\s+housing\s+assistance|private\s+pay\s+only|hcv\s+not\s+accepted)\b/gi,
    protectedClass: "source_of_income",
    violationType: "discriminatory_language",
    severity: "critical",
    explanation: "Violation of ORS 659A.421 - Source of Income discrimination",
  },
  // Steering Indicators
  {
    pattern:
      /\b(safe\s+area|good\s+schools?|better\s+neighborhood|nice\s+part\s+of\s+town|you'?d?\s+fit\s+in|your\s+kind)\b/gi,
    protectedClass: "race",
    violationType: "steering",
    severity: "high",
    explanation: "Potential steering based on neighborhood characteristics",
  },
  // National Origin
  {
    pattern: /\b(english\s+only|must\s+speak\s+english|citizen(ship)?\s+required|no\s+immigrants?|legal\s+status)\b/gi,
    protectedClass: "national_origin",
    violationType: "discriminatory_language",
    severity: "high",
    explanation: "Language indicating national origin discrimination",
  },
  // Disability
  {
    pattern:
      /\b(no\s+wheelchairs?|no\s+service\s+animals?|no\s+emotional\s+support|able[- ]bodied|physically\s+capable)\b/gi,
    protectedClass: "disability",
    violationType: "discriminatory_language",
    severity: "critical",
    explanation: "Language indicating disability discrimination",
  },
  // Criminal History (Washington County)
  {
    pattern: /\b(no\s+felons?|no\s+criminal\s+history|background\s+must\s+be\s+clean|7[- ]?year\s+lookback)\b/gi,
    protectedClass: "criminal_history",
    violationType: "discriminatory_language",
    severity: "medium",
    explanation: "May violate Portland Metro criminal history screening limits",
  },
  // Gender Identity (Oregon)
  {
    pattern: /\b(born\s+(fe)?male|biological\s+(wo)?man|real\s+(wo)?men)\b/gi,
    protectedClass: "gender_identity",
    violationType: "discriminatory_language",
    severity: "high",
    explanation: "Potential ORS 659A.403 violation - Gender identity discrimination",
  },
]

// Response latency thresholds for bias detection (in minutes)
export const RESPONSE_LATENCY_THRESHOLDS = {
  normal: 240, // 4 hours
  delayed: 480, // 8 hours
  significant: 1440, // 24 hours
  severe: 2880, // 48 hours
}

// Calculate litigation risk score (0-100)
export function calculateLitigationRisk(violations: LegalViolation[]): number {
  if (violations.length === 0) return 0

  const severityWeights: Record<RiskSeverity, number> = {
    low: 10,
    medium: 25,
    high: 50,
    critical: 80,
  }

  const jurisdictionMultiplier: Record<JurisdictionLevel, number> = {
    federal: 1.5,
    state: 1.2,
    local: 1.0,
  }

  let totalScore = 0
  for (const violation of violations) {
    const base = severityWeights[violation.severity]
    const multiplier = jurisdictionMultiplier[violation.jurisdiction]
    const confidenceAdjusted = base * multiplier * violation.confidence
    totalScore += confidenceAdjusted
  }

  // Normalize to 0-100 scale
  return Math.min(100, Math.round(totalScore))
}

// Generate remediation suggestion based on violation type
export function getRemediationSuggestion(violation: LegalViolation): string {
  const remediations: Record<ViolationType, (v: LegalViolation) => string> = {
    disparate_treatment: (v) =>
      `Immediate agent retraining required on ${v.protectedClass} protections. Document corrective action.`,
    disparate_impact: (v) =>
      `Review and revise policies that may disproportionately affect ${v.protectedClass}. Conduct impact analysis.`,
    steering: () => `Mandatory fair housing training. Implement standardized property presentation scripts.`,
    digital_redlining: () =>
      `Audit response time policies. Implement automated acknowledgment systems to ensure equal treatment.`,
    discriminatory_language: (v) =>
      `Agent used prohibited language regarding ${v.protectedClass}. Suggest immediate retraining and policy review.`,
    response_latency_bias: () =>
      `Implement automated response systems to ensure consistent reply times across all inquiries.`,
  }

  return remediations[violation.type](violation)
}

// Determine jurisdiction based on protected class
export function getJurisdiction(protectedClass: ProtectedClass): JurisdictionLevel {
  const federalClasses: ProtectedClass[] = [
    "race",
    "color",
    "religion",
    "sex",
    "familial_status",
    "national_origin",
    "disability",
  ]
  const stateClasses: ProtectedClass[] = ["source_of_income", "sexual_orientation", "gender_identity", "marital_status"]

  if (federalClasses.includes(protectedClass)) return "federal"
  if (stateClasses.includes(protectedClass)) return "state"
  return "local"
}
