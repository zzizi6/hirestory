"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { INTERVIEW_TYPES } from "@/types/interview";
import type { InterviewNoteFormData } from "@/types/interview";
import type { Application } from "@/types/application";

const FIELD_BASE =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const initialForm: InterviewNoteFormData = {
  applicationId: "",
  interviewAt: new Date().toISOString().split("T")[0],
  interviewType: "기술",
  questions: [{ question: "", answer: "" }],
  goodPoints: "",
  badPoints: "",
  improvements: "",
};

export function InterviewNoteForm() {
  const router = useRouter();
  const [form, setForm] = useState<InterviewNoteFormData>(initialForm);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => r.json())
      .then((data: Application[]) => {
        setApplications(data);
        if (data.length > 0) {
          setForm((prev) => ({ ...prev, applicationId: data[0].id }));
        }
      })
      .catch(() => {});
  }, []);

  function handleField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleQuestion(index: number, field: "question" | "answer", value: string) {
    setForm((prev) => {
      const questions = [...prev.questions];
      questions[index] = { ...questions[index], [field]: value };
      return { ...prev, questions };
    });
  }

  function addQuestion() {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, { question: "", answer: "" }],
    }));
  }

  function removeQuestion(index: number) {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await fetch("/api/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/interviews");
    } else {
      const json = (await res.json()) as { error?: string };
      setError(json.error ?? "저장 중 오류가 발생했습니다.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 기본 정보 */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground">기본 정보</h2>

        <div className="space-y-1.5">
          <label htmlFor="applicationId" className="text-sm font-medium text-foreground">
            지원 기록 <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <select
            id="applicationId"
            name="applicationId"
            required
            value={form.applicationId}
            onChange={handleField}
            className={FIELD_BASE}
          >
            {applications.length === 0 && (
              <option value="">지원 기록을 먼저 추가해 주세요</option>
            )}
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.companyName} — {app.position}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="interviewAt" className="text-sm font-medium text-foreground">
            면접일 <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="interviewAt"
            name="interviewAt"
            type="date"
            required
            value={form.interviewAt}
            onChange={handleField}
            className={FIELD_BASE}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="interviewType" className="text-sm font-medium text-foreground">
            면접 유형 <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <select
            id="interviewType"
            name="interviewType"
            value={form.interviewType}
            onChange={handleField}
            className={FIELD_BASE}
          >
            {INTERVIEW_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 질문 & 답변 */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">질문 &amp; 답변</h2>

        <ul className="space-y-4">
          {form.questions.map((q, i) => (
            <li key={i} className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Q{i + 1}</span>
                {form.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(i)}
                    aria-label={`질문 ${i + 1} 삭제`}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <input
                type="text"
                required
                value={q.question}
                onChange={(e) => handleQuestion(i, "question", e.target.value)}
                placeholder="면접 질문을 입력하세요"
                aria-label={`질문 ${i + 1}`}
                className={FIELD_BASE}
              />
              <textarea
                rows={3}
                value={q.answer}
                onChange={(e) => handleQuestion(i, "answer", e.target.value)}
                placeholder="답변을 입력하세요"
                aria-label={`질문 ${i + 1} 답변`}
                className={cn(FIELD_BASE, "resize-none")}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-input px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          질문 추가
        </button>
      </section>

      {/* 회고 */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground">회고</h2>

        <div className="space-y-1.5">
          <label htmlFor="goodPoints" className="text-sm font-medium text-foreground">
            잘한 점
          </label>
          <textarea
            id="goodPoints"
            name="goodPoints"
            rows={3}
            value={form.goodPoints}
            onChange={handleField}
            placeholder="면접에서 잘했다고 생각한 점을 적어보세요."
            className={cn(FIELD_BASE, "resize-none")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="badPoints" className="text-sm font-medium text-foreground">
            부족했던 점
          </label>
          <textarea
            id="badPoints"
            name="badPoints"
            rows={3}
            value={form.badPoints}
            onChange={handleField}
            placeholder="아쉬웠거나 부족하다고 느낀 점을 적어보세요."
            className={cn(FIELD_BASE, "resize-none")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="improvements" className="text-sm font-medium text-foreground">
            개선점
          </label>
          <textarea
            id="improvements"
            name="improvements"
            rows={3}
            value={form.improvements}
            onChange={handleField}
            placeholder="다음 면접을 위해 개선할 점을 적어보세요."
            className={cn(FIELD_BASE, "resize-none")}
          />
        </div>
      </section>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !form.applicationId}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
