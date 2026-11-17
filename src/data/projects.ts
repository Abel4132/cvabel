import type { Dictionary } from '../i18n/es'
import { profile } from './profile'

export type ProjectId = keyof Dictionary['projects']['items']
export type ProjectCategory = 'security' | 'backend' | 'fullstack'

export interface ProjectMeta {
  id: ProjectId
  categories: ProjectCategory[]
  stack: string[]
  /** Capas de la arquitectura, de cliente a datos. */
  architecture: string[]
  repo?: string
}

export const projects: ProjectMeta[] = [
  {
    id: 'conajeba',
    categories: ['backend', 'security'],
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'AWS', 'React'],
    architecture: ['React SPA', 'JWT + MFA', 'NestJS API · Guards', 'PostgreSQL', 'AWS · IAM / S3'],
  },
  {
    id: 'arca',
    categories: ['fullstack', 'security'],
    stack: ['Node.js', 'Angular', 'TypeScript'],
    architecture: ['Angular', 'Node.js API', 'CFDI bulk download', 'Fiscal data'],
  },
  {
    id: 'biblioteca',
    categories: ['fullstack'],
    stack: ['Angular', 'Firebase', 'GoogieHost'],
    architecture: ['Angular SPA', 'Firebase', 'GoogieHost → AWS'],
  },
  {
    id: 'portfolio',
    categories: ['security'],
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Zod'],
    architecture: ['GitHub Pages', 'CSP', 'React SPA', 'Zod + honeypot', 'EmailJS API'],
    repo: profile.repo,
  },
]
