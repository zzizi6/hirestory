export const INTERVIEW_TYPES = ["인성", "기술", "임원", "기타"] as const;
export type InterviewType = (typeof INTERVIEW_TYPES)[number];

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface InterviewNote {
  id: string;
  applicationId: string;
  companyName: string;
  position: string;
  interviewAt: string;
  interviewType: string;
  questions: InterviewQuestion[];
  goodPoints: string;
  badPoints: string;
  improvements: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewNoteFormData {
  applicationId: string;
  interviewAt: string;
  interviewType: string;
  questions: Omit<InterviewQuestion, "id">[];
  goodPoints: string;
  badPoints: string;
  improvements: string;
}
