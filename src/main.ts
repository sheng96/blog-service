import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestLoggingInterceptor } from './common/interceptor/request.logger.interceptor';
import { LoggerService } from './common/logger/logger.service';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('blog')
      .setDescription('这是一个博客的api')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docApi', app, document);
  }
  const loggerService = app.get(LoggerService);
  app.useGlobalInterceptors(new RequestLoggingInterceptor(loggerService));

  await app.listen(8888);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then(() => {
  console.log('http://127.0.0.1:8888');
});
