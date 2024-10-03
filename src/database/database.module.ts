import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionDoc, TransactionSchema } from '../transactions/transaction.model';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('dbConfig.connectionUri'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
