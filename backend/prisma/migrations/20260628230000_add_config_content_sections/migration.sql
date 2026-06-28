-- AlterTable
ALTER TABLE "config"
ADD COLUMN     "aboutBio" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "servicesContent" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "testimonialsContent" JSONB NOT NULL DEFAULT '{}';
