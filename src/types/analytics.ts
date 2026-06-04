export interface ConversionRate {
  label: string;
  passed: number;
  total: number;
  rate: number; // 0 ~ 1
}

export interface InterviewTypeCount {
  type: string;
  count: number;
}

export interface AnalyticsData {
  conversionRates: ConversionRate[];
  interviewTypes: InterviewTypeCount[];
}
