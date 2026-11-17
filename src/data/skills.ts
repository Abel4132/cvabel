import type { Dictionary } from '../i18n/es'
import type { LucideIcon } from 'lucide-react'
import { CodeXml, Database, LayoutTemplate, Network, Server, ShieldCheck, Sparkles } from 'lucide-react'

export type CategoryId = keyof Dictionary['stack']['categories']
export type SkillKey = keyof Dictionary['stack']['skills']

export interface Skill {
  name: string
  /** Clave de la descripción localizada; los lenguajes no la necesitan. */
  key?: SkillKey
}

export interface SkillCategory {
  id: CategoryId
  icon: LucideIcon
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'security',
    icon: ShieldCheck,
    skills: [
      { name: 'JWT', key: 'jwt' },
      { name: 'RBAC · Guards', key: 'rbac' },
      { name: 'MFA / 2FA', key: 'mfa' },
      { name: 'Password hashing', key: 'hashing' },
      { name: 'DTO validation', key: 'dto' },
      { name: 'ISO/IEC 27001', key: 'iso' },
      { name: 'Backups & recovery', key: 'backups' },
      { name: 'CFDI / PII', key: 'sensitive' },
    ],
  },
  {
    id: 'network',
    icon: Network,
    skills: [
      { name: 'Nmap', key: 'nmap' },
      { name: 'Wireshark', key: 'wireshark' },
      { name: 'Burp Suite', key: 'burp' },
      { name: 'Kali Linux', key: 'kali' },
      { name: 'Cisco', key: 'cisco' },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    skills: [
      { name: 'NestJS', key: 'nest' },
      { name: 'Node.js', key: 'node' },
      { name: 'Laravel', key: 'laravel' },
      { name: 'AWS', key: 'aws' },
      { name: 'REST APIs', key: 'rest' },
    ],
  },
  {
    id: 'frontend',
    icon: LayoutTemplate,
    skills: [
      { name: 'Angular', key: 'angular' },
      { name: 'React', key: 'react' },
      { name: 'TypeScript', key: 'ts' },
    ],
  },
  {
    id: 'data',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', key: 'postgres' },
      { name: 'MySQL', key: 'mysql' },
      { name: 'SQL Server', key: 'sqlserver' },
      { name: 'Firebase', key: 'firebase' },
    ],
  },
  {
    id: 'tooling',
    icon: Sparkles,
    skills: [
      { name: 'Claude · Claude Code', key: 'claude' },
      { name: 'Git', key: 'git' },
      { name: 'GitHub CLI (gh)', key: 'ghcli' },
      { name: 'GitHub Actions', key: 'actions' },
    ],
  },
  {
    id: 'languages',
    icon: CodeXml,
    skills: [
      { name: 'Java' },
      { name: 'Python' },
      { name: 'C#' },
      { name: 'C++' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'PHP' },
      { name: 'Ensamblador IBM' },
    ],
  },
]
