import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ApplicationCard } from "@/components/features/applications/ApplicationCard";
import type { Application } from "@/types/application";

async function getApplications(): Promise<Application[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/applications`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">지원 기록</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {applications.length}건
          </p>
        </div>
        <Link
          href="/applications/new"
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
          새 기록 추가
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <p className="text-muted-foreground">아직 지원 기록이 없습니다.</p>
          <Link
            href="/applications/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            첫 기록 추가하기
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <li key={app.id}>
              <ApplicationCard application={app} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
