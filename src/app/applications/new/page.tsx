import { ApplicationForm } from "@/components/features/applications/ApplicationForm";

export default function NewApplicationPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-foreground">새 지원 기록</h1>
      <ApplicationForm />
    </div>
  );
}
