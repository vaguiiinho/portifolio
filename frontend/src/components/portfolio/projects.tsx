import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { SectionHeader } from "./section-header"
import { projectsContent } from "@/lib/content"
import { ProjectsGallery } from "./projects-gallery"

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-2xl">
            <SectionHeader align="left" title={projectsContent.title} subtitle={projectsContent.subtitle} />
          </div>
          <Button as="a" href="#contact" className="rounded-full shrink-0">
            Quero um case assim
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <ProjectsGallery />
      </Container>
    </section>
  )
}
