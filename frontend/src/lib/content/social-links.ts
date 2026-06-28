import { Github, Linkedin, Mail, MessageCircleMore } from "lucide-react"

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
] as const
