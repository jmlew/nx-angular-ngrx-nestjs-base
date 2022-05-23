import { Workitem, WorkitemParams } from './workitem.model';
export { Workitem, WorkitemParams };

export interface CreateWorkitemResponse extends Workitem {
  createdAt: string;
}

export interface UpdateWorkitemResponse extends Workitem {
  updatedAt: string;
}

export interface GetWorkitemsResponse {
  data: Workitem[];
}

export interface GetWorkitemResponse {
  data: Workitem;
}
