"use client"

import { motion } from "framer-motion"
import { Container } from "./container"
import { SectionHeading } from "./section-heading"
import { Badge } from "./badge"

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "GraphQL", category: "API" },
  { name: "Tailwind CSS", category: "Styling" },
]

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary/30">
      <Container>
        <SectionHeading
          title="About Me"
          subtitle="Passionate about creating impactful digital experiences through clean code and thoughtful design."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Avatar / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent/10 rounded-3xl blur-2xl" />
              
              {/* Avatar Placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                <div className="text-9xl font-bold text-muted-foreground/20">A</div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {`Hi, I'm Alex Chen, a Full Stack Developer with over 5 years of experience 
                building web applications that solve real problems. I specialize in 
                creating performant, accessible, and visually stunning digital products.`}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {`My approach combines technical excellence with a deep understanding of user 
                needs. I believe that great software should not only work flawlessly but 
                also delight users at every interaction.`}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {`When I'm not coding, you'll find me exploring new technologies, contributing 
                to open source projects, or mentoring aspiring developers. I'm always 
                excited to take on new challenges and collaborate on innovative projects.`}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Technologies I work with
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Badge variant="glow">{tech.name}</Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
