import { CalendarView } from "@/components/features/calendar/CalendarView";

interface RawEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: "deadline" | "interview" | "result";
  applicationId: string;
}

async function getCalendarEvents(): Promise<RawEvent[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/calendar`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">캘린더</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          지원 마감일, 면접일, 결과 발표일을 한눈에 확인하세요.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" aria-hidden="true" />
          지원 마감
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" aria-hidden="true" />
          면접
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" aria-hidden="true" />
          결과 발표
        </span>
      </div>

      <CalendarView events={events} />
    </div>
  );
}
