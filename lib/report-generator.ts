// FairGuard AI - Legal Report Generator
// Generates structured JSON for PDF export with statute citations

import type { LegalViolation, RiskSeverity, ProtectedClass } from "./legal-logic"

export interface LegalReportMetadata {
  reportId: string
  generatedAt: string
  generatedBy: string
  version: string
  jurisdiction: {
    federal: boolean
    state: string
    county: string
  }
}

export interface ViolationReport {
  violationId: string
  timestamp: string
  severity: RiskSeverity
  statuteViolated: {
    code: string
    title: string
    fullText: string
  }
  protectedClass: ProtectedClass
  evidence: {
    type: "email" | "pattern" | "latency" | "statistical"
    description: string
    sourceId: string
    excerpt?: string
  }[]
  analysisNotes: string
  confidenceScore: number
  chainOfThought: string[]
}

export interface RemediationAction {
  priority: "immediate" | "short-term" | "long-term"
  action: string
  responsible: string
  deadline: string
  statute: string
}

export interface LegalExpertBrief {
  metadata: LegalReportMetadata
  executiveSummary: {
    totalViolations: number
    criticalCount: number
    highCount: number
    mediumCount: number
    lowCount: number
    overallRiskScore: number
    primaryConcerns: string[]
  }
  violations: ViolationReport[]
  statisticalAnalysis: {
    disparateImpact: {
      detected: boolean
      affectedClasses: string[]
      approvalRateDisparity: number
      responseTimeDisparity: number
    }
    timeframeAnalyzed: {
      start: string
      end: string
      totalEmailsAnalyzed: number
      totalThreadsAnalyzed: number
    }
  }
  remediationPlan: RemediationAction[]
  legalDisclaimer: string
}

// Generate the full legal brief structure
export function generateLegalBrief(
  violations: LegalViolation[],
  emailCount: number,
  threadCount: number,
  startDate: string,
  endDate: string,
): LegalExpertBrief {
  const criticalViolations = violations.filter((v) => v.severity === "critical")
  const highViolations = violations.filter((v) => v.severity === "high")
  const mediumViolations = violations.filter((v) => v.severity === "medium")
  const lowViolations = violations.filter((v) => v.severity === "low")

  const avgRisk =
    violations.length > 0 ? violations.reduce((sum, v) => sum + v.litigationRiskScore, 0) / violations.length : 0

  // Identify primary concerns
  const primaryConcerns: string[] = []
  const sourceOfIncomeViolations = violations.filter((v) => v.protectedClass === "source_of_income")
  if (sourceOfIncomeViolations.length > 0) {
    primaryConcerns.push(`Source of Income discrimination (ORS 659A.421): ${sourceOfIncomeViolations.length} instances`)
  }
  const steeringViolations = violations.filter((v) => v.type === "steering")
  if (steeringViolations.length > 0) {
    primaryConcerns.push(`Geographic steering indicators: ${steeringViolations.length} instances`)
  }
  const latencyViolations = violations.filter((v) => v.type === "response_latency_bias")
  if (latencyViolations.length > 0) {
    primaryConcerns.push(`Response latency bias (digital redlining): ${latencyViolations.length} instances`)
  }

  return {
    metadata: {
      reportId: `FGAI-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      generatedBy: "FairGuard AI v2.1",
      version: "2.1.0",
      jurisdiction: {
        federal: true,
        state: "Oregon",
        county: "Washington County",
      },
    },
    executiveSummary: {
      totalViolations: violations.length,
      criticalCount: criticalViolations.length,
      highCount: highViolations.length,
      mediumCount: mediumViolations.length,
      lowCount: lowViolations.length,
      overallRiskScore: Math.round(avgRisk),
      primaryConcerns,
    },
    violations: violations.map((v) => ({
      violationId: v.id,
      timestamp: new Date().toISOString(),
      severity: v.severity,
      statuteViolated: {
        code: v.statute,
        title: getStatuteTitle(v.statute),
        fullText: v.statuteText,
      },
      protectedClass: v.protectedClass,
      evidence: v.evidence.map((e) => ({
        type: "pattern" as const,
        description: `Detected phrase: "${e}"`,
        sourceId: v.id,
        excerpt: e,
      })),
      analysisNotes: v.suggestedRemediation,
      confidenceScore: v.confidence,
      chainOfThought: [
        `Identified ${v.type} violation pattern`,
        `Matched against ${v.protectedClass} protection criteria`,
        `Applied ${v.jurisdiction} jurisdiction rules`,
        `Calculated ${v.severity} severity based on evidence strength`,
      ],
    })),
    statisticalAnalysis: {
      disparateImpact: {
        detected: sourceOfIncomeViolations.length > 0 || latencyViolations.length > 0,
        affectedClasses: [...new Set(violations.map((v) => v.protectedClass))],
        approvalRateDisparity: 27.7, // Mock - would be calculated from actual data
        responseTimeDisparity: 4.2, // Mock - would be calculated from actual data
      },
      timeframeAnalyzed: {
        start: startDate,
        end: endDate,
        totalEmailsAnalyzed: emailCount,
        totalThreadsAnalyzed: threadCount,
      },
    },
    remediationPlan: generateRemediationPlan(violations),
    legalDisclaimer: LEGAL_DISCLAIMER,
  }
}

function getStatuteTitle(statute: string): string {
  const titles: Record<string, string> = {
    "ORS 659A.421": "Oregon Unlawful Discrimination - Source of Income",
    "ORS 659A.403": "Oregon Unlawful Discrimination - Sexual Orientation/Gender Identity",
    "42 U.S.C. § 3604(a)": "Federal Fair Housing Act - Race, Color, National Origin",
    "42 U.S.C. § 3604(b)": "Federal Fair Housing Act - Familial Status",
    "42 U.S.C. § 3604(f)": "Federal Fair Housing Act - Disability",
    "Metro Code 10.01.030": "Portland Metro Criminal History Screening Ordinance",
    "Metro Code 10.01.040": "Portland Metro Credit Screening Limitations",
  }
  return titles[statute] || "Fair Housing Statute"
}

function generateRemediationPlan(violations: LegalViolation[]): RemediationAction[] {
  const actions: RemediationAction[] = []

  const hasCritical = violations.some((v) => v.severity === "critical")
  const hasSourceOfIncome = violations.some((v) => v.protectedClass === "source_of_income")
  const hasSteering = violations.some((v) => v.type === "steering")

  if (hasCritical) {
    actions.push({
      priority: "immediate",
      action: "Suspend implicated agent(s) pending investigation",
      responsible: "HR Director",
      deadline: "Within 24 hours",
      statute: "General compliance",
    })
    actions.push({
      priority: "immediate",
      action: "Notify legal counsel and initiate litigation risk assessment",
      responsible: "General Counsel",
      deadline: "Within 24 hours",
      statute: "General compliance",
    })
  }

  if (hasSourceOfIncome) {
    actions.push({
      priority: "immediate",
      action: "Cease all Section 8/voucher denial practices immediately",
      responsible: "Operations Director",
      deadline: "Immediately",
      statute: "ORS 659A.421",
    })
    actions.push({
      priority: "short-term",
      action: "Conduct mandatory ORS 659A.421 training for all leasing agents",
      responsible: "Training Manager",
      deadline: "Within 7 days",
      statute: "ORS 659A.421",
    })
    actions.push({
      priority: "short-term",
      action: "Update all marketing materials to remove 'no Section 8' language",
      responsible: "Marketing Director",
      deadline: "Within 14 days",
      statute: "ORS 659A.421",
    })
  }

  if (hasSteering) {
    actions.push({
      priority: "short-term",
      action: "Implement standardized property presentation scripts",
      responsible: "Operations Director",
      deadline: "Within 14 days",
      statute: "42 U.S.C. § 3604",
    })
    actions.push({
      priority: "long-term",
      action: "Establish quarterly steering audit procedures",
      responsible: "Compliance Officer",
      deadline: "Within 30 days",
      statute: "42 U.S.C. § 3604",
    })
  }

  actions.push({
    priority: "long-term",
    action: "Implement automated response time monitoring system",
    responsible: "IT Director",
    deadline: "Within 60 days",
    statute: "General compliance",
  })

  actions.push({
    priority: "long-term",
    action: "Schedule annual fair housing audit with external counsel",
    responsible: "General Counsel",
    deadline: "Annually",
    statute: "General compliance",
  })

  return actions
}

export const LEGAL_DISCLAIMER = `LEGAL DISCLAIMER

This report is generated by FairGuard AI, an automated forensic analysis system. The findings contained herein are based on pattern matching, statistical analysis, and natural language processing of communications data.

IMPORTANT NOTICES:

1. NOT LEGAL ADVICE: This report does not constitute legal advice. The analysis is probabilistic and should be reviewed by qualified legal counsel before any action is taken.

2. HUMAN REVIEW REQUIRED: All findings require human verification. AI analysis may produce false positives or miss context that a human reviewer would catch.

3. EVIDENCE PRESERVATION: This report should be treated as work product. Organizations should preserve all underlying evidence in accordance with document retention policies and litigation hold requirements.

4. CONFIDENTIALITY: This report may contain privileged information. Distribution should be limited to individuals with a legitimate need to know.

5. NO WARRANTY: FairGuard AI makes no warranty as to the accuracy, completeness, or legal sufficiency of this analysis. Users assume all risk associated with reliance on this report.

6. JURISDICTIONAL LIMITATIONS: Analysis is configured for Oregon (ORS Chapter 659A) and Washington County, Oregon. Findings may not be applicable to other jurisdictions.

For legal advice regarding fair housing compliance, consult with an attorney licensed in the relevant jurisdiction.

Generated by FairGuard AI v2.1
© 2026 FairGuard Systems. All rights reserved.`
