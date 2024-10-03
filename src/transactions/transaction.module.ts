import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppLoggerModule } from '../app-logger/app-logger.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
    imports: [DatabaseModule, AppLoggerModule],
    providers: [TransactionService],
    controllers: [TransactionController],
})
export class TransactionsModule {}
