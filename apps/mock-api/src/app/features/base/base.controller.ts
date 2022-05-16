import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class BaseController {
  @Get()
  @HttpCode(200)
  getHealthCheck(): string {
    return 'This a health check of the Mock API. Everything is fit and healthy';
  }
}
