-- Add featured flag to projects
ALTER TABLE "projects"
ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT FALSE;
