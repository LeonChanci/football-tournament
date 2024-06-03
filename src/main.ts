import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
     whitelist: true, //True, el validador eliminará el objeto validado de cualquier propiedad que no tenga decoradores.
     forbidNonWhitelisted: true, //True, En lugar de eliminar las propiedades no incluidas en la lista blanca, el validador arrojará un error
    }),
  );
  //Prefijo de la applicación
  app.setGlobalPrefix('api/v1/')
  await app.listen(3000);
}
bootstrap();
