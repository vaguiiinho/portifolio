import { Container } from "./container"
import { FadeIn } from "@/components/ui/fade-in"

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
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            About Me
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Passionate about creating impactful digital experiences through clean code and thoughtful design.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Avatar / Image */}
          <FadeIn className="relative">
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
          </FadeIn>

          {/* Bio */}
          <FadeIn direction="right" className="space-y-6">
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
                  <FadeIn key={tech.name} direction="up" delay={index * 0.05}>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                      {tech.name}
                    </span>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
