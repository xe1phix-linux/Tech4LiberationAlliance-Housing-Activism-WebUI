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
  Youtube,
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
    url: "https://gitlab.com/xe1phix",
    icon: Gitlab,
    iconColor: "text-orange-500",
    badge: "https://img.shields.io/badge/GitLab-xe1phix-FC6D26?style=flat&logo=gitlab&logoColor=white",
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
    url: "http://pastebin.com/u/xe1phix",
    icon: Clipboard,
    iconColor: "text-slate-400",
    badge: "https://img.shields.io/badge/Pastebin-xe1phix-020000?style=flat&logo=pastebin&logoColor=white",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@xe1phix",
    icon: Youtube,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/YouTube-@xe1phix-FF0000?style=flat&logo=youtube&logoColor=white",
    extraBadges: [
      "https://img.shields.io/youtube/channel/subscribers/UC4rzx4VToyHJDWbAEJ5cMxQ?style=social",
    ],
  },
  {
    name: "Gmail - MarkRobertCurry",
    url: "mailto:markrobertcurry@gmail.com",
    icon: Mail,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/GMail-markrobertcurry-EA4335?style=flat&logo=gmail&logoColor=white",
  },
  {
    name: "ProtonMail - MarkRobertCurry",
    url: "mailto:markrobertcurry@protonmail.com",
    icon: Lock,
    iconColor: "text-purple-500",
    badge: "https://img.shields.io/badge/ProtonMail-markrobertcurry-6D4AFF?style=flat&logo=protonmail&logoColor=white",
  },
  {
    name: "ProtonMail - Xe1phix",
    url: "mailto:xe1phix@protonmail.ch",
    icon: Lock,
    iconColor: "text-purple-500",
    badge: "https://img.shields.io/badge/ProtonMail-xe1phix-6D4AFF?style=flat&logo=protonmail&logoColor=white",
  },
]
