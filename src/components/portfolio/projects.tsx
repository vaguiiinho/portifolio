"use client"

import { useState } from "react"
import { Container } from "./container"
import { SectionHeading } from "./section-heading"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"

const projects: Project[] = [
  {
    id: "1",
    title: "CloudSync Dashboard",
    description: "A real-time cloud infrastructure monitoring dashboard with automated alerting, resource optimization suggestions, and team collaboration features.",
    image: "/projects/cloudsync.jpg",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "FinTrack Pro",
    description: "Personal finance management application with AI-powered spending insights, budget tracking, and investment portfolio analysis.",
    image: "/projects/fintrack.jpg",
    techStack: ["React", "Node.js", "MongoDB", "OpenAI", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "DevCollab",
    description: "Real-time code collaboration platform for remote teams with integrated video chat, code review tools, and project management.",
    image: "/projects/devcollab.jpg",
    techStack: ["Next.js", "WebRTC", "Socket.io", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "4",
    title: "EcoMarket",
    description: "Sustainable e-commerce platform connecting eco-conscious consumers with verified sustainable brands and products.",
    image: "/projects/ecomarket.jpg",
    techStack: ["Next.js", "Stripe", "Supabase", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "5",
    title: "HealthPulse",
    description: "Telemedicine platform with appointment scheduling, video consultations, prescription management, and health records.",
    image: "/projects/healthpulse.jpg",
    techStack: ["React", "Express", "PostgreSQL", "WebRTC", "HIPAA"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "6",
    title: "TaskFlow AI",
    description: "Intelligent project management tool with AI-powered task prioritization, time estimates, and workflow automation.",
    image: "/projects/taskflow.jpg",
    techStack: ["Next.js", "OpenAI", "Prisma", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects that showcase my expertise in building modern, scalable applications."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </Container>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
