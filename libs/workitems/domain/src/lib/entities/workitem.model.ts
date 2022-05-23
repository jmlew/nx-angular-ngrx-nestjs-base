export interface WorkitemDbItem {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkitemParams {
  name: string;
  description?: string;
}

export interface Workitem extends WorkitemParams, WorkitemDbItem {}
