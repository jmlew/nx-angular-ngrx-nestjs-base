import { Observable, interval, map } from 'rxjs';

import {
  CreateWorkitemResponse,
  GetWorkitemResponse,
  GetWorkitemsResponse,
  UpdateWorkitemResponse,
  Workitem,
  WorkitemParams,
} from '@app/workitems/api-model';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Sse,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { WorkitemsService } from './workitems.service';

enum ErrorMessage {
  NoWorkitemMatch = 'Workitem does not exist in the Mock DB.',
  DuplicateNoWorkitem = 'Duplicate workitem name in Mock DB.',
}

@Controller('workitems')
export class WorkitemsController {
  constructor(private readonly userService: WorkitemsService) {}

  // TODO: Enure interval scheduler is not duplicated upon subsequent connections.
  @Sse('stream')
  getWorkitemsSse(): Observable<MessageEvent<GetWorkitemsResponse>> {
    return interval(1000).pipe(
      map(() => {
        const id: number = this.userService.getRandomWorkitemId();
        const workitem: Workitem = this.userService.getWorkitemById(id).data;
        const randomData: string = Date.now().toString();
        workitem.description = randomData;
        this.userService.updateWorkitem(id, workitem);
        const response: GetWorkitemsResponse = this.userService.getAllWorkitems();
        return { data: response } as MessageEvent;
      })
    );
  }

  @Get('reset')
  getResetDb(): string {
    this.userService.initDb();
    return 'Mock API Workitems DB has been reset.';
  }

  @Get()
  getWorkitems(): Observable<GetWorkitemsResponse> {
    return this.toStream(this.userService.getAllWorkitems(), 1000);
  }

  @Get(':id')
  getWorkitem(@Param('id') id: string): Observable<GetWorkitemResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesWorkitemExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoWorkitemMatch);
    }
    return this.toStream(this.userService.getWorkitemById(userId));
  }

  @Post()
  createWorkitem(@Body() params: WorkitemParams): Observable<CreateWorkitemResponse> {
    if (this.userService.isWorkitemDuplicate(params)) {
      throw new BadRequestException(ErrorMessage.DuplicateNoWorkitem);
    }
    return this.toStream(this.userService.createWorkitem(params));
  }

  @Put(':id')
  updateWorkitem(
    @Param('id') id: string,
    @Body() params: Workitem
  ): Observable<UpdateWorkitemResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesWorkitemExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoWorkitemMatch);
    }
    if (this.userService.isWorkitemDuplicate(params, userId)) {
      throw new BadRequestException(ErrorMessage.DuplicateNoWorkitem);
    }
    return this.toStream(this.userService.updateWorkitem(userId, params));
  }

  @Delete(':id')
  deleteWorkitem(@Param('id') id: string): Observable<number> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesWorkitemExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoWorkitemMatch);
    }
    return this.toStream(this.userService.deleteWorkitem(userId));
  }

  @Delete()
  deleteWorkitems(@Body() ids: string[]): Observable<number[]> {
    const userIds: number[] = ids.map((id: string) => parseInt(id, 10));
    return this.toStream(this.userService.deleteWorkitems(userIds));
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
