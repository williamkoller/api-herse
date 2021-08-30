import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from '@/docs/swagger-config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { LoggingInterceptor, TimeoutInterceptor } from '@/common/interceptors';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    exposedHeaders: '*',
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor(), new LoggingInterceptor());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<string>('port');

  swaggerConfig(app);

  await app.listen(port, () =>
    logger.log(`Running 🔥 in ${config.get<string>('nodeEnv')} mode `),
  );
}
bootstrap();
