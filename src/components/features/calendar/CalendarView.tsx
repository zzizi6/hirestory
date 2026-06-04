"use client";

import { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { CalendarEvent, CalendarEventType } from "@/types/calendar";

moment.locale("ko");
const localizer = momentLocalizer(moment);

const EVENT_COLORS: Record<CalendarEventType, string> = {
  deadline: "#ef4444",
  interview: "#f59e0b",
  result: "#3b82f6",
};

interface RawEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: CalendarEventType;
  applicationId: string;
}

interface CalendarViewProps {
  events: RawEvent[];
}

export function CalendarView({ events }: CalendarViewProps) {
  const parsed = useMemo(
    () =>
      events.map((e) => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      })),
    [events]
  );

  function eventStyleGetter(event: CalendarEvent) {
    return {
      style: {
        backgroundColor: EVENT_COLORS[event.type],
        borderRadius: "4px",
        border: "none",
        color: "#fff",
        fontSize: "0.75rem",
      },
    };
  }

  const messages = {
    today: "오늘",
    previous: "이전",
    next: "다음",
    month: "월",
    week: "주",
    day: "일",
    agenda: "일정",
    date: "날짜",
    time: "시간",
    event: "이벤트",
    noEventsInRange: "이 기간에 일정이 없습니다.",
  };

  return (
    <div className="h-[600px] rounded-xl border border-border bg-background p-4">
      <Calendar
        localizer={localizer}
        events={parsed}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        messages={messages}
        style={{ height: "100%" }}
      />
    </div>
  );
}
