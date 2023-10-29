import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseRoutePipe implements PipeTransform<string> {
  logger = new Logger(ParseRoutePipe.name);
  transform(value: string, metadata: ArgumentMetadata): string {
    // NOTICE: ROUTE PIPE
    this.logger.log('===TRIGGER ROUTE PARAMS PIPE===');
    return value;
  }
}
