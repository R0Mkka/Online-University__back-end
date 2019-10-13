import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

const swaggerOptions = new DocumentBuilder()
  .setTitle('Online University API')
  .setDescription('The whole list of possible requests to server.')
  .setVersion('1.0')
  .addTag('login')
  .addTag('logout')
  .addTag('users')
  .addTag('courses')
  .addTag('chats')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  // TODO: Set up cors
  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
