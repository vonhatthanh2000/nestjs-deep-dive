import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from '@interceptors';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);

  // GLOBAL INTERCEPTOR
  // Thêm vào đây
  app.useGlobalInterceptors(new LoggingInterceptor());

  // GLOBAL MIDDLEWARE
  app.use(helmet());

  app.use((req: Request, res: Response, next) => {
    logger.debug('=== TRIGGER GLOBAL MIDDLEWARE ===');
    next();
  });

  await app.listen(3000);
}

bootstrap();
