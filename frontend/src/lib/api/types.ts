import type { LocalizedContent, ServicesContent, TestimonialsContent } from "@/lib/site-content"

export interface ApiProject { id: string; title: string; description: string; techStack: string[]; githubUrl?: string | null; liveUrl?: string | null; videoUrl?: string | null; problemTitle?: string | null; problemDescription?: string | null; solutionTitle?: string | null; solutionDescription?: string | null; resultTitle?: string | null; resultDescription?: string | null; featured?: boolean; createdAt: string; updatedAt: string }
export interface AuthUser { id: string; email: string; role: "visitante" | "administrador" }
export interface LoginPayload { email: string; password: string }
export interface LoginResponse { user: AuthUser }
export interface ProjectPayload { title: string; description: string; techStack: string[]; githubUrl?: string; liveUrl?: string; videoUrl?: string; problemTitle?: string; problemDescription?: string; solutionTitle?: string; solutionDescription?: string; resultTitle?: string; resultDescription?: string; featured?: boolean }
export interface ConfigPayload { siteName?: string; description?: string; aboutBio?: LocalizedContent<string[]>; servicesContent?: LocalizedContent<ServicesContent>; testimonialsContent?: LocalizedContent<TestimonialsContent> }
export interface ApiConfig { id: string; siteName: string; description: string; aboutBio?: LocalizedContent<string[]>; servicesContent?: LocalizedContent<ServicesContent>; testimonialsContent?: LocalizedContent<TestimonialsContent>; updatedAt: string }
export interface ApiStats { id: string; projectsCount: number; visitors: number; events: Record<string, number>; updatedAt: string }
export interface ContactPayload { name: string; email: string; message: string }
