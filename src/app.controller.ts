import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null.interceptor';

@Controller()
@UseInterceptors(TimeoutInterceptor)
export class AppController {
  private logger: Logger;
  constructor(private readonly appService: AppService) {
    this.logger = new Logger(AppController.name);
  }

  @Get('')
  @UseInterceptors(ExcludeNullInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/module-middleware')
  getHelloWithMiddleware(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
}
