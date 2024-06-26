import os from 'os';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { WinstonModule } from 'nest-winston';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from './common/providers/config.service';
import { IConfig } from './config/config';
import { winstonOptions } from './logger/winston.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonOptions),
  });

  // Use Helmet
  app.use(helmet());

  // Use cors
  app.enableCors({ origin: true, credentials: true });

  // Auto-validation (using class-validator);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Extract port form config service
  const configService: ConfigService<IConfig> = app.get(ConfigService);
  const port = configService.get('port');
  const name = configService.get('name');
  const version = configService.get('version');

  app.setGlobalPrefix('api');

  // Init Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter Kit')
    .setDescription('Backend API starter kit using NestJS and Mongo.')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    customCss: theme.getBuffer('dark'),
  };
  SwaggerModule.setup('api/docs', app, document, options);

  const message = `
        App is listening...
        App Name: ${name}
        Version: ${version}
        Port: ${port}
        Username: ${os.userInfo().username}
    `;

  await app.listen(port, () => console.log(message));
}

bootstrap();
