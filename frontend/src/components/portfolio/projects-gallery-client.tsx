"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard, type Project } from "./project-card"
import { ProjectModal } from "./project-modal"
import { ProjectFormModal } from "./project-form-modal"
import { deleteProject } from "@/lib/api"
import { trackStatsEvent } from "@/lib/analytics"
import type { Locale } from "@/lib/locale"
import { useAuth } from "@/components/auth/auth-provider"

interface ProjectsGalleryClientProps {
  projects: Project[]
  error?: string | null
  allowCreate?: boolean
  locale: Locale
}

export function ProjectsGalleryClient({ projects, error, allowCreate = false, locale }: ProjectsGalleryClientProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const canManageProjects = isAuthenticated && user?.role === "administrador"

  async function handleDelete(project: Project) {
    const confirmationMessage =
      locale === "en"
        ? `Delete the project "${project.title}"? This cannot be undone.`
        : `Excluir o projeto "${project.title}"? Esta ação não pode ser desfeita.`

    if (!window.confirm(confirmationMessage)) {
      return
    }

    try {
      setActionError(null)
      await deleteProject(project.id)
      setSelectedProject(null)
      setEditingProject(null)
      router.refresh()
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : locale === "en"
            ? "Failed to delete the project"
            : "Falha ao excluir o projeto",
      )
    }
  }

  return (
    <>
      {!isLoading && allowCreate && canManageProjects && (
        <div className="mb-6 flex justify-end">
          <Button
            onClick={() => {
              setActionError(null)
              setEditingProject(null)
              setIsCreateOpen(true)
            }}
            className="rounded-full"
          >
            <Plus className="h-4 w-4" />
            {locale === "en" ? "New project" : "Novo projeto"}
          </Button>
        </div>
      )}

      {error ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-8 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-destructive" />
          {error}
        </div>
      ) : actionError ? (
        <div className="mb-6 flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 py-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {actionError}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted-foreground">
          {locale === "en" ? "No published case yet." : "Nenhum case publicado ainda."}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              locale={locale}
              onClick={() => {
                trackStatsEvent(`project:view:${project.id}`)
                setSelectedProject(project)
              }}
            />
          ))}
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
        canManage={canManageProjects}
        onEdit={(project) => {
          setActionError(null)
          setSelectedProject(null)
          setIsCreateOpen(false)
          setEditingProject(project)
        }}
        onDelete={(project) => void handleDelete(project)}
      />
      <ProjectFormModal
        key={editingProject?.id ?? (isCreateOpen ? "create" : "closed")}
        open={isCreateOpen || Boolean(editingProject)}
        project={editingProject}
        onClose={() => {
          setIsCreateOpen(false)
          setEditingProject(null)
        }}
        onSaved={() => router.refresh()}
        locale={locale}
      />
    </>
  )
}
