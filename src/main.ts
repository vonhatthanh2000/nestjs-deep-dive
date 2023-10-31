import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '@interceptors';
import { CustomValidationPipe } from '@pipes';
import { HttpExceptionFilter } from './common/exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // // EXCEPTION FILTER
  // app.useGlobalFilters(new HttpExceptionFilter());

  // // GLOBAL PIPE
  // app.useGlobalPipes(new CustomValidationPipe());

  // // GLOBAL INTERCEPTOR
  // app.useGlobalInterceptors(new LoggingInterceptor());

  // // GLOBAL MIDDLEWARE
  // app.use(helmet());

  // app.use((req: Request, res: Response, next) => {
  //   logger.debug('=== TRIGGER GLOBAL MIDDLEWARE ===');
  //   next();
  // });

  const config = new DocumentBuilder()
    .setTitle('Authentication and note management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3010);
}

bootstrap();
