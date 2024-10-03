import { Module } from '@nestjs/common';
import { ContractStreamer } from './contract-streamer';
import { AppLoggerModule } from '../app-logger/app-logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [ScheduleModule.forRoot(), AppLoggerModule, DatabaseModule],
    providers: [ContractStreamer],
})
export class ContractStreamerModule {}
