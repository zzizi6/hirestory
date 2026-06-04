import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import type { InterviewNote } from "@/types/interview";

interface InterviewNoteCardProps {
  note: InterviewNote;
}

export function InterviewNoteCard({ note }: InterviewNoteCardProps) {
  const { id, companyName, position, interviewAt, interviewType, questions } = note;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">{companyName}</h3>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
        <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {interviewType}
        </span>
      </div>

      <p className="text-xs text-muted-foreground">면접일: {formatDate(interviewAt)}</p>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
        <span>질문 {questions.length}개</span>
      </div>

      <div className="mt-auto pt-1">
        <Link
          href={`/interviews/${id}`}
          className="text-xs text-muted-foreground hover:text-foreground hover:underline"
        >
          상세 보기
        </Link>
      </div>
    </article>
  );
}
