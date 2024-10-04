import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { TransactionDoc } from './transaction.model';
import { Filter, Sort } from '../shared/filer.query';

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel(TransactionDoc.name) private readonly transactionDao: Model<TransactionDoc>) {}

    findAll(sort?: Sort): Promise<TransactionDoc[]> {
        return this.transactionDao.find().sort(sort);
    }

    findAllFiltered(filter?: Filter, sort?: Sort): Promise<TransactionDoc[]> {
        const { or, ...andFilter } = filter ?? {};
        const docFilter: QueryOptions = {
            ...(Object.keys(andFilter).length > 0 && { $and: andFilter }),
            ...(or && { $or: or }),
        };
        return this.transactionDao.find(docFilter).sort(sort);
    }

    create(doc: TransactionDoc): Promise<TransactionDoc> {
        return this.transactionDao.create(doc);
    }
}
