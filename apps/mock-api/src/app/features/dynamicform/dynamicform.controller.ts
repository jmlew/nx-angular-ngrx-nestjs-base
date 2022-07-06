import { Observable } from 'rxjs';

import { GetFormConfigsResponse } from '@app/shared/dynamicform/api-model';
import { Controller, Get } from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { DynamicFormService } from './dynamicform.service';

enum ErrorMessage {
  NoDynamicFormCOnfigs = 'No DynamicForm configs available.',
}

@Controller('dynamicform')
export class DynamicFormController {
  constructor(private readonly dynamicFormService: DynamicFormService) {}

  @Get('configs')
  getConfigs(): Observable<GetFormConfigsResponse> {
    // throw new BadRequestException(ErrorMessage.NoDynamicFormCOnfigs);
    return this.toStream(this.dynamicFormService.getConfigs(), 1000);
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
