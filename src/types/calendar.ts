export type CalendarEventType = "deadline" | "interview" | "result";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: CalendarEventType;
  applicationId: string;
}
