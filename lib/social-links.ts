import {
  Gitlab,
  Github,
  Linkedin,
  Terminal,
  Send,
  Clipboard,
  Codepen,
  Mail,
  Lock,
  AtSign,
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
    name: "TryHackMe",
    url: "https://tryhackme.com/r/p/N3tanyah",
    icon: Terminal,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/TryHackMe-%40N3tanyah-212C42?style=plastic&logo=tryhackme&logoColor=white",
    extraBadges: ["https://img.shields.io/badge/tryhackme-%23212C42.svg?&style=plastic&logo=tryhackme&logoColor=white"],
  },
  {
    name: "Telegram",
    url: "https://t.me/N3tanyah",
    icon: Send,
    iconColor: "text-sky-400",
    badge: "https://img.shields.io/badge/Telegram-%40N3tanyahPDX-blue?style=flat&logo=telegram",
  },
  {
    name: "Pastebin",
    url: "https://pastebin.com/u/N3tanyahPDX",
    icon: Clipboard,
    iconColor: "text-slate-400",
    badge: "https://img.shields.io/badge/Pastebin-020000?style=flat&logo=pastebin&logoColor=white",
  },
  {
    name: "CodePen",
    url: "https://codepen.io/N3tanyah",
    icon: Codepen,
    iconColor: "text-slate-400",
    badge: "https://img.shields.io/badge/Codepen-@N3tanyah-000000?style=social&logo=codepen&logoColor=",
    extraBadges: [
      "https://img.shields.io/badge/Codepen-000000?style=social&logo=codepen&logoColor=",
      "https://img.shields.io/badge/Codepen-000000?style=plastic&logo=codepen&logoColor=",
    ],
  },
  {
    name: "Gmail",
    url: "mailto:Netanyahpdx@gmail.com",
    icon: Mail,
    iconColor: "text-red-500",
    badge: "https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white",
  },
  {
    name: "ProtonMail",
    url: "mailto:netanyahpdx@protonmail.com",
    icon: Lock,
    iconColor: "text-purple-500",
    badge: "https://img.shields.io/badge/ProtonMail-8B89CC?style=plastic&logo=protonmail&logoColor=white",
  },
  {
    name: "Mastodon",
    url: "https://mastodon.social/@N3tanyahPDX",
    icon: AtSign,
    iconColor: "text-indigo-500",
    badge:
      "https://img.shields.io/mastodon/follow/114578966185369318?style=social&logo=mastodon&link=https%3A%2F%2Fmastodon.social%2F%40N3tanyahPDX",
  },
]
