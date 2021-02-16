import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_SERVER_CONST } from './common/constants/config.constants';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const serverConfig = app.get(ConfigService).get(CONFIG_SERVER_CONST);

  app.use(helmet());

  app.enableCors({
    origin: serverConfig.host
  });

  const config = new DocumentBuilder()
    .setTitle('Viewer API')
    .setDescription('Viewer API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(serverConfig.port);

  logger.log(
    `Application running on ${serverConfig.host}:${serverConfig.port}`
  );
}
bootstrap();
