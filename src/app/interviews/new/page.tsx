import { InterviewNoteForm } from "@/components/features/interviews/InterviewNoteForm";

export default function NewInterviewNotePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">면접 노트 작성</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          면접 질문과 답변, 회고를 기록해 두세요.
        </p>
      </div>
      <InterviewNoteForm />
    </div>
  );
}
