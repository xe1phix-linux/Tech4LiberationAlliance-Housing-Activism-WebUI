"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/navigation/top-navbar"
import { BadgeFooter } from "@/components/navigation/badge-footer"
import { Briefcase, Award, ExternalLink, Calendar, CheckCircle } from "lucide-react"

const CERTIFICATIONS = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2023",
    credentialId: "COMP001234567",
    status: "Active",
    skills: ["Network Security", "Cryptography", "Risk Management"]
  },
  {
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2022",
    credentialId: "ECC-1234567890",
    status: "Active",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Security Auditing"]
  },
  {
    name: "Linux Professional Institute Certification",
    issuer: "LPI",
    date: "2021",
    credentialId: "LPI-000123456",
    status: "Active",
    skills: ["Linux Administration", "System Security", "Network Configuration"]
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-SAA-1234567",
    status: "Active",
    skills: ["Cloud Architecture", "AWS Services", "Infrastructure Design"]
  },
]

const EXPERIENCE = [
  {
    title: "Senior Security Engineer",
    company: "Tech 4 Liberation Alliance",
    period: "2022 - Present",
    description: "Leading security initiatives and housing activism technology projects"
  },
  {
    title: "Linux Systems Administrator",
    company: "Various Clients",
    period: "2020 - 2022",
    description: "Managed and secured Linux infrastructure for multiple organizations"
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Sidebar />
      <TopNavbar />

      <main className="ml-16 md:ml-64 mt-24 p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="glass-panel rounded-lg border border-cyan-500/20 p-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-3xl font-mono font-bold text-white">XE</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-mono font-bold text-cyan-300 mb-2">Xe1phix</h1>
                <p className="text-lg font-mono text-slate-400 mb-4">
                  Security Engineer | Linux Specialist | Housing Activism Technologist
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/xelphix/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-sm font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="glass-panel rounded-lg border border-cyan-500/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-mono font-bold text-cyan-300">Experience</h2>
            </div>
            <div className="space-y-6">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className="border-l-2 border-cyan-500/30 pl-4">
                  <h3 className="text-lg font-mono font-semibold text-cyan-300">{exp.title}</h3>
                  <p className="text-sm font-mono text-slate-400 mb-2">{exp.company}</p>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                  <p className="text-sm font-mono text-slate-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel rounded-lg border border-cyan-500/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-mono font-bold text-cyan-300">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={index}
                  className="bg-slate-800/30 border border-cyan-500/20 rounded-lg p-5 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-mono font-semibold text-cyan-300 mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-sm font-mono text-slate-400">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-mono">{cert.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    Issued: {cert.date}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mb-3">
                    Credential ID: <span className="text-cyan-400">{cert.credentialId}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-mono text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="glass-panel rounded-lg border border-cyan-500/20 p-6">
            <h2 className="text-xl font-mono font-bold text-cyan-300 mb-6">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Linux Administration",
                "Security Auditing",
                "Docker & Kubernetes",
                "Python",
                "Bash Scripting",
                "Network Security",
                "PostgreSQL",
                "Git & GitLab",
                "Cryptography",
                "Penetration Testing",
                "Cloud Computing",
                "DevOps"
              ].map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-slate-800/30 border border-cyan-500/20 rounded text-center hover:border-cyan-500/50 transition-colors"
                >
                  <span className="text-sm font-mono text-slate-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BadgeFooter />
    </div>
  )
}
