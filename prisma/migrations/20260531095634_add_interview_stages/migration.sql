/*
  Warnings:

  - The values [INTERVIEW] on the enum `ApplicationStage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStage_new" AS ENUM ('APPLIED', 'DOCUMENT', 'APTITUDE', 'INTERVIEW_1', 'INTERVIEW_2', 'FINAL', 'PASSED', 'FAILED');
ALTER TABLE "public"."Application" ALTER COLUMN "stage" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "stage" TYPE "ApplicationStage_new" USING ("stage"::text::"ApplicationStage_new");
ALTER TYPE "ApplicationStage" RENAME TO "ApplicationStage_old";
ALTER TYPE "ApplicationStage_new" RENAME TO "ApplicationStage";
DROP TYPE "public"."ApplicationStage_old";
ALTER TABLE "Application" ALTER COLUMN "stage" SET DEFAULT 'APPLIED';
COMMIT;

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "hasAptitude" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasSecondInterview" BOOLEAN NOT NULL DEFAULT false;
