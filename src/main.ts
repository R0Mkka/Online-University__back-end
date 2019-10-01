import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  // TODO: Set up cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
