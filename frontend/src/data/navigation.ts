import { Github, Linkedin, Mail, MessageCircleMore } from "lucide-react"
import { portfolioRoutes } from "@/lib/routes"

export const navLinks = [
  { name: "Início", href: portfolioRoutes.home },
  { name: "Serviços", href: portfolioRoutes.services },
  { name: "Projetos", href: portfolioRoutes.projects },
  { name: "Currículo", href: portfolioRoutes.resume },
  { name: "Sobre", href: portfolioRoutes.about },
  { name: "Contato", href: portfolioRoutes.contact },
]

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/joaosilva",
    icon: Github,
    username: "github.com/joaosilva",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/joaosilva",
    icon: Linkedin,
    username: "linkedin.com/in/joaosilva",
  },
  {
    name: "E-mail",
    href: "mailto:hello@joaosilva.dev",
    icon: Mail,
    username: "hello@joaosilva.dev",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/5500000000000",
    icon: MessageCircleMore,
    username: "+55 00 00000-0000",
  },
]

export const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Deployment" },
  { name: "Git", category: "Tools" },
]
