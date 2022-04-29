import { Observable } from 'rxjs';

import { User } from '@example-app/users/domain';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getData(): Observable<User[]> {
    return this.appService.getData();
  }
}
