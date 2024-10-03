import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, SortOrder } from 'mongoose';
import { TransactionDoc } from './transaction.model';

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel(TransactionDoc.name) private readonly transactionDao: Model<TransactionDoc>) {}

    findAll(): Promise<TransactionDoc[]> {
        return this.transactionDao.find();
    }

    findAllFiltered(filter: QueryOptions, sort?: { [key: string]: SortOrder }): Promise<TransactionDoc[]> {
        return this.transactionDao.find(filter).sort(sort);
    }

    create(doc: TransactionDoc): Promise<TransactionDoc> {
        return this.transactionDao.create(doc);
    }
}
