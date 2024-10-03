import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './app-logger/app-logger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = await app.resolve(AppLogger);
    app.useLogger(logger);

    const appConfig = app.get(ConfigService).get<AppConfig>('application');
    logger.setContext(appConfig.name);

    await app.listen(3000);
}
bootstrap();
