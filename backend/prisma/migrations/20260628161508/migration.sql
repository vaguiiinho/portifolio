-- AlterTable
ALTER TABLE "stats" ADD COLUMN     "events" JSONB NOT NULL DEFAULT '{}';
