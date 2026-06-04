"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buildStages, type ApplicationFormData } from "@/types/application";

const FIELD_BASE =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

const initialFormData: ApplicationFormData = {
  companyName: "",
  position: "",
  postingUrl: "",
  appliedAt: new Date().toISOString().split("T")[0],
  stage: "지원",
  hasAptitude: false,
  hasSecondInterview: false,
  memo: "",
  deadlineAt: null,
  interviewAt: null,
  resultAt: null,
};

interface ApplicationFormProps {
  onSubmit?: (data: ApplicationFormData) => void;
}

export function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ApplicationFormData>(initialFormData);

  const availableStages = buildStages({
    hasAptitude: form.hasAptitude,
    hasSecondInterview: form.hasSecondInterview,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: checked };
      const stages = buildStages({
        hasAptitude: next.hasAptitude,
        hasSecondInterview: next.hasSecondInterview,
      });
      if (!stages.includes(next.stage)) {
        next.stage = stages[0];
      }
      return next;
    });
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSubmit?.(form);
      router.push("/applications");
    } else {
      const json = (await res.json()) as { error?: string };
      setError(json.error ?? "저장 중 오류가 발생했습니다.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 회사명 */}
      <div className="space-y-1.5">
        <label htmlFor="companyName" className="text-sm font-medium text-foreground">
          회사명 <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          required
          value={form.companyName}
          onChange={handleChange}
          placeholder="카카오"
          className={FIELD_BASE}
        />
      </div>

      {/* 직무 */}
      <div className="space-y-1.5">
        <label htmlFor="position" className="text-sm font-medium text-foreground">
          직무 <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          id="position"
          name="position"
          required
          value={form.position}
          onChange={handleChange}
          placeholder="프론트엔드 개발자"
          className={FIELD_BASE}
        />
      </div>

      {/* 공고 URL */}
      <div className="space-y-1.5">
        <label htmlFor="postingUrl" className="text-sm font-medium text-foreground">
          공고 링크
        </label>
        <input
          id="postingUrl"
          name="postingUrl"
          type="url"
          value={form.postingUrl}
          onChange={handleChange}
          placeholder="https://careers.kakao.com/..."
          className={FIELD_BASE}
        />
      </div>

      {/* 지원일 */}
      <div className="space-y-1.5">
        <label htmlFor="appliedAt" className="text-sm font-medium text-foreground">
          지원일 <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          id="appliedAt"
          name="appliedAt"
          type="date"
          required
          value={form.appliedAt}
          onChange={handleChange}
          className={FIELD_BASE}
        />
      </div>

      {/* 전형 옵션 */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-foreground">전형 구성</legend>
        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="hasAptitude"
              checked={form.hasAptitude}
              onChange={handleCheckbox}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            인적성 포함
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="hasSecondInterview"
              checked={form.hasSecondInterview}
              onChange={handleCheckbox}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            면접 2차 포함
          </label>
        </div>
      </fieldset>

      {/* 현재 전형 단계 */}
      <div className="space-y-1.5">
        <label htmlFor="stage" className="text-sm font-medium text-foreground">
          현재 단계 <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <select
          id="stage"
          name="stage"
          value={form.stage}
          onChange={handleChange}
          className={FIELD_BASE}
        >
          {availableStages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* 일정 */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-foreground">일정 (선택)</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label htmlFor="deadlineAt" className="text-xs text-muted-foreground">
              지원 마감일
            </label>
            <input
              id="deadlineAt"
              name="deadlineAt"
              type="date"
              value={form.deadlineAt ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, deadlineAt: e.target.value || null }))
              }
              className={FIELD_BASE}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="interviewAt" className="text-xs text-muted-foreground">
              면접일
            </label>
            <input
              id="interviewAt"
              name="interviewAt"
              type="date"
              value={form.interviewAt ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, interviewAt: e.target.value || null }))
              }
              className={FIELD_BASE}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="resultAt" className="text-xs text-muted-foreground">
              결과 발표일
            </label>
            <input
              id="resultAt"
              name="resultAt"
              type="date"
              value={form.resultAt ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, resultAt: e.target.value || null }))
              }
              className={FIELD_BASE}
            />
          </div>
        </div>
      </fieldset>

      {/* 메모 */}
      <div className="space-y-1.5">
        <label htmlFor="memo" className="text-sm font-medium text-foreground">
          메모
        </label>
        <textarea
          id="memo"
          name="memo"
          rows={4}
          value={form.memo}
          onChange={handleChange}
          placeholder="자유롭게 메모를 남겨보세요."
          className={cn(FIELD_BASE, "resize-none")}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {/* 버튼 */}
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
          disabled={isSubmitting}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
