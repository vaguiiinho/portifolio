"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Github, Linkedin, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "./container"
import { SectionHeading } from "./section-heading"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    username: "@alexchen",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    username: "alexchen",
  },
  {
    name: "Email",
    href: "mailto:hello@alexchen.dev",
    icon: Mail,
    username: "hello@alexchen.dev",
  },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // Reset form
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Let's Build Something Together"
          subtitle="Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your ideas to life."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Get in touch</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                {`I'm currently available for freelance work and full-time opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!`}
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-accent/50 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                    <link.icon className="h-5 w-5 group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{link.name}</div>
                    <div className="text-sm text-muted-foreground">{link.username}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="rounded-xl bg-card border-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="rounded-xl bg-card border-border focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="rounded-xl bg-card border-border focus:border-accent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="rounded-xl bg-card border-border focus:border-accent resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
