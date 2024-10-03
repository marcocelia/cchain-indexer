import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractStreamerModule } from './contract-streamer/contract-streamer.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigLoader } from './config/config.loader';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        AppLoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ConfigLoader],
        }),
        ContractStreamerModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
