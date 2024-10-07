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

    topAddresses(): Promise<{ address: string; balance: string }[]> {
        return this.transactionDao
            .aggregate<{ address: string; balance: number }>([
                {
                    $facet: {
                        incomes: [
                            {
                                $group: {
                                    _id: '$from',
                                    balance: { $sum: '$value' },
                                },
                            },
                        ],
                        outcomes: [
                            {
                                $group: {
                                    _id: '$to',
                                    balance: { $sum: { $multiply: ['$value', -1] } },
                                },
                            },
                        ],
                    },
                },
                {
                    $project: {
                        balances: { $setUnion: ['$incomes', '$outcomes'] },
                    },
                },
                {
                    $unwind: '$balances',
                },
                {
                    $group: {
                        _id: '$balances._id',
                        balance: { $sum: '$balances.balance' },
                    },
                },
                {
                    $sort: { balance: -1 },
                },
                {
                    $project: { _id: 0, address: '$_id', balance: 1 },
                },
                {
                    $limit: 100,
                },
            ])
            .exec()
            .then((docs) =>
                docs.map((doc) => ({
                    ...doc,
                    balance: doc.balance?.toString(),
                })),
            );
    }
}
