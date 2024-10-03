import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { TransactionDoc } from './transaction.model';

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel(TransactionDoc.name) private readonly transactionDao: Model<TransactionDoc>) {}

    findAll(): Promise<TransactionDoc[]> {
        return this.transactionDao.find();
    }

    findAllFiltered(filter: QueryOptions): Promise<TransactionDoc[]> {
        return this.transactionDao.find(filter);
    }

    create(doc: TransactionDoc): Promise<TransactionDoc> {
        return this.transactionDao.create(doc);
    }
}
