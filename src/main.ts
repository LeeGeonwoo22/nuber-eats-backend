import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { JwtMiddleware } from './jwt/jwt.middleware';
// import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  // app.enableCors({
  //   origin: 'http://localhost:3000/', // 허용할 출처
  //   methods: ['GET','POST'], // 허용할 HTTP 메서드
  //   allowedHeaders: 'Content-Type, Accept', // 허용할 헤더
  // });
  await app.listen(4000);
  
}
bootstrap();
