import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('projectId'),
    "privateKey": configService.get<string>('FB_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('FB_CLIENT_EMAIL'),
  };

  initializeApp({
    credential: cert(adminConfig),
  });
  
  await app.listen(process.env.PORT);
}
bootstrap();
