import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService, BaseSseDataService, SseStream } from '@app/shared/util-http';

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
export class WorkitemsDataService {
  private baseUrl = `${ApiEndpoint.Base}/${ApiEndpoint.Workitems}`;

  constructor(private data: BaseDataService, private sseData: BaseSseDataService) {}

  getWorkitemsStream(): SseStream<Workitem[]> {
    const url = `${this.baseUrl}/${ApiEndpoint.SseStream}`;
    const sse: SseStream<GetWorkitemsResponse> =
      this.sseData.getStream<GetWorkitemsResponse>(url);

    return {
      source: sse.source,
      data: sse.data.pipe(map((response: GetWorkitemsResponse) => response.data)),
    };
  }

  getWorkitems(): Observable<Workitem[]> {
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
