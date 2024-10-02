import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigLoader } from './config/config.loader';
import { AppLoggerModule } from './app-logger/app-logger.module';

@Module({
    imports: [
        AppLoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ConfigLoader],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
