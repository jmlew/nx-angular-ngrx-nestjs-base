import { Observable } from 'rxjs';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { NavigationService } from './navigation.service';

enum ErrorMessage {
  NoNavigationFeatures = 'No Navigation feature items available.',
}

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get('features')
  getNavigationFeatures(): Observable<string[]> {
    // throw new BadRequestException(ErrorMessage.NoNavigationFeatures);
    return this.toStream(this.navigationService.getFeatureNames(), 1000);
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
