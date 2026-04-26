import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github, username: "@alexchen" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, username: "alexchen" },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter, username: "@alexchen" },
  { name: "Email", href: "mailto:hello@alexchen.dev", icon: Mail, username: "hello@alexchen.dev" },
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