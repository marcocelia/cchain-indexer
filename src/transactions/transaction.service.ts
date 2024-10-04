import { Injectable } from '@nestjs/common';
import { TransactionDoc } from './transaction.model';
import { TransactionRepository } from './transaction.repository';
import { Filter, Sort } from '../shared/filer.query';

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    findAll(filter?: Filter, sort?: Sort): Promise<TransactionDoc[]> {
        return this.transactionRepository.findAllFiltered(filter, sort);
    }

    findAllSentOrReceived(address: string): Promise<TransactionDoc[]> {
        return this.transactionRepository.findAllFiltered(
            {
                or: [
                    {
                        to: address,
                    },
                    {
                        from: address,
                    },
                ],
            },
            {
                blockNumber: 1,
                transactionIndex: 1,
            },
        );
    }

    countSentOrReceived(address: string): Promise<number> {
        return this.findAllSentOrReceived(address).then((transactions) => transactions.length);
    }
}
