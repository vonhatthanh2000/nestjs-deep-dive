import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TimeoutInterceptor } from './common/interceptors/controller-timeout.interceptor';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null.interceptor';
import { ParseControllerValidationPipe } from './common/pipes/parse-controller.pipe';
import { ParseRouteValidationPipe } from './common/pipes/parse-route.pipe';

@Controller()
@UseInterceptors(TimeoutInterceptor)
@UsePipes(ParseControllerValidationPipe)
export class AppController {
  private logger: Logger;
  constructor(private readonly appService: AppService) {
    this.logger = new Logger(AppController.name);
  }

  @Get('global')
  getGlobal(): string {
    return this.appService.getHello();
  }

  @Get('')
  @UseInterceptors(ExcludeNullInterceptor)
  @UsePipes(ParseRouteValidationPipe)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/module-middleware')
  getHelloWithMiddleware(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }
}
