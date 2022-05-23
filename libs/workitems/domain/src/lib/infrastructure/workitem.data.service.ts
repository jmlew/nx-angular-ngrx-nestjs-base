import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-common';

import {
  CreateWorkitemResponse,
  GetWorkitemResponse,
  GetWorkitemsResponse,
  UpdateWorkitemResponse,
  Workitem,
  WorkitemParams,
} from '../entities/workitem-api.model';

enum ApiEndpoint {
  Base = 'api',
  Workitems = 'workitems',
  SseStream = 'stream',
}

@Injectable()
export class WorkitemDataService {
  private baseUrl = `${ApiEndpoint.Base}/${ApiEndpoint.Workitems}`;

  constructor(private data: BaseDataService) {}

  getAllWorkitemsStream(): Observable<Workitem[]> {
    const url = `${this.baseUrl}/${ApiEndpoint.SseStream}`;
    return this.data
      .getSse<GetWorkitemsResponse>(url)
      .pipe(map((response: GetWorkitemsResponse) => response.data));
  }

  getAllWorkitems(): Observable<Workitem[]> {
    return this.data
      .get<GetWorkitemsResponse>(this.baseUrl)
      .pipe(map((response: GetWorkitemsResponse) => response.data));
  }

  getWorkitemById(id: number): Observable<Workitem> {
    return this.data
      .get<GetWorkitemResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((response: GetWorkitemResponse) => response.data));
  }

  createWorkitem(workitem: WorkitemParams): Observable<CreateWorkitemResponse> {
    return this.data.post<CreateWorkitemResponse>(this.baseUrl, workitem);
  }

  updateWorkitem(workitem: Workitem): Observable<UpdateWorkitemResponse> {
    return this.data.put<UpdateWorkitemResponse>(
      `${this.baseUrl}/${workitem.id}`,
      workitem
    );
  }

  deleteWorkitem(id: number): Observable<number> {
    return this.data.delete<number>(`${this.baseUrl}/${id}`);
  }

  deleteWorkitems(ids: number[]): Observable<number[]> {
    return this.data.deleteMany<number[]>(this.baseUrl, ids);
  }
}
