import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionDoc, TransactionSchema } from '../transactions/transaction.model';
import { ConfigService } from '@nestjs/config';
import { TransactionRepository } from '../transactions/transaction.repository';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('dbConfig.connectionUri'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: TransactionDoc.name, schema: TransactionSchema }]),
    ],
    providers: [TransactionRepository],
    exports: [TransactionRepository],
})
export class DatabaseModule {}
