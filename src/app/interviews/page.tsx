import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { InterviewNoteCard } from "@/components/features/interviews/InterviewNoteCard";
import type { InterviewNote } from "@/types/interview";

async function getInterviewNotes(): Promise<InterviewNote[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/interviews`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function InterviewsPage() {
  const notes = await getInterviewNotes();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">면접 노트</h1>
          <p className="mt-1 text-sm text-muted-foreground">총 {notes.length}건</p>
        </div>
        <Link
          href="/interviews/new"
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
          새 노트 추가
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <p className="text-muted-foreground">아직 면접 노트가 없습니다.</p>
          <Link
            href="/interviews/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            첫 노트 작성하기
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <li key={note.id}>
              <InterviewNoteCard note={note} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
