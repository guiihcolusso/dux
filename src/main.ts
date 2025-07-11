import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.AMB === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('DuxAPI')
      .setDescription(
        'Documentação da API com detalhes dos endpoints, parâmetros, respostas e autenticação.',
      )
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('v1/api/docs', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
