import {
  Gitlab,
  Github,
  Linkedin,
  Send,
  Clipboard,
  Mail,
  Lock,
  Key,
  ShieldCheck,
  GitBranch,
  FileCode,
  type LucideIcon,
} from "lucide-react"

export interface SocialLink {
  name: string
  url: string
  icon: LucideIcon
  iconColor: string
  badge: string
  extraBadges?: string[]
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitLab",
    url: "https://gitlab.com/xe1phix/ParrotLinux-Public-Kiosk-Project",
    icon: Gitlab,
    iconColor: "text-orange-500",
    badge: "https://badgen.net/gitlab/stars/xe1phix/ParrotLinux-Public-Kiosk-Project",
    extraBadges: ["https://badgen.net/gitlab/forks/xe1phix/ParrotSec-Linux-Hardening-Project"],
  },
  {
    name: "GitHub",
    url: "https://github.com/xe1phix/Xe1phix-ParrotSec-Linux-Hardening-Project",
    icon: Github,
    iconColor: "text-slate-400",
    badge:
      "https://img.shields.io/github/repo-size/xe1phix/Xe1phix-ParrotSec-Linux-Hardening-Project?style=social&logo=github",
  },
  {
    name: "Gists",
    url: "https://gist.github.com/xe1phix",
    icon: FileCode,
    iconColor: "text-cyan-400",
    badge: "https://img.shields.io/badge/Gists-xe1phix-33B5E5?logo=github",
    extraBadges: ["https://img.shields.io/badge/Gists-xe1phix-blue?style=social&logo=github"],
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/xelphix/",
    icon: Linkedin,
    iconColor: "text-blue-500",
    badge: "https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff",
  },
  {
    name: "Bitbucket",
    url: "https://bitbucket.org/xe1phix",
    icon: GitBranch,
    iconColor: "text-blue-600",
    badge: "https://img.shields.io/badge/Bitbucket-0747a6?style=plastic&logo=bitbucket&logoColor=white",
  },
  {
    name: "GnuPG Key",
    url: "https://gitlab.com/xe1phix/Gnupg/blob/master/Xe1phix.asc",
    icon: Key,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/Xe1phix's-GnuPG%20Key-red?style=flat&logo=gnu",
  },
  {
    name: "Keyoxide",
    url: "https://keyoxide.org/aspe:keyoxide.org:F3NMBYYB6EA2CDKJL7OS73BXAQ",
    icon: ShieldCheck,
    iconColor: "text-blue-400",
    badge: "https://img.shields.io/badge/Keyoxide-@Xe1phix-blue?style=plastic&logo=keyoxide",
  },
  {
    name: "Telegram",
    url: "https://telegram.me/xe1phix",
    icon: Send,
    iconColor: "text-sky-400",
    badge: "https://img.shields.io/badge/Telegram-%40Xe1phix-blue?style=flat&logo=telegram",
    extraBadges: [
      "https://img.shields.io/badge/Telegram-%40Xe1phix__Portland-blue?style=flat&logo=telegram",
    ],
  },
  {
    name: "Pastebin",
    url: "https://pastebin.com/u/xe1phix",
    icon: Clipboard,
    iconColor: "text-slate-400",
    badge: "https://img.shields.io/badge/Pastebin-020000?style=flat&logo=pastebin&logoColor=white",
  },
  {
    name: "Gmail - MarkRobertCurry",
    url: "mailto:markrobertcurry@gmail.com",
    icon: Mail,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/GMail-MarkRobertCurry-EA4335?style=flat&logo=gmail",
  },
  {
    name: "Gmail - Xe1phix",
    url: "mailto:xe1phix@gmail.com",
    icon: Mail,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/GMail-Xe1phix-EA4335?style=flat&logo=gmail",
  },
  {
    name: "Gmail - Xe1phix.Shute",
    url: "mailto:xe1phix.shute@gmail.com",
    icon: Mail,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/GMail-Xe1phix.shute-EA4335?style=plastic&logo=gmail",
  },
  {
    name: "Gmail - Xe1phix.Linux",
    url: "mailto:xe1phix.linux@gmail.com",
    icon: Mail,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/GMail-Xe1phix.linux-EA4335?style=social&logo=gmail",
  },
  {
    name: "ProtonMail - Xe1phix",
    url: "mailto:xe1phix@protonmail.ch",
    icon: Lock,
    iconColor: "text-purple-500",
    badge: "https://img.shields.io/badge/ProtonMail-Xe1phix-8B89CC?style=flat&logo=protonmail",
  },
  {
    name: "ProtonMail - MarkRobertCurry",
    url: "mailto:markrobertcurry@protonmail.com",
    icon: Lock,
    iconColor: "text-purple-500",
    badge: "https://img.shields.io/badge/ProtonMail-MarkRobertCurry-8B89CC?style=flat&logo=protonmail",
  },
]
