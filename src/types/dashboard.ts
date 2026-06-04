export interface StageCount {
  stage: string;
  count: number;
}

export interface MonthCount {
  month: string;
  count: number;
}

export interface DashboardData {
  total: number;
  inProgress: number;
  passed: number;
  failed: number;
  byStage: StageCount[];
  byMonth: MonthCount[];
}
