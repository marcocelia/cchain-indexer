import { Injectable } from '@nestjs/common';
import { TransactionDoc } from './transaction.model';
import { TransactionRepository } from './transaction.repository';
import { from } from 'rxjs';

@Injectable()
export class TransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    findAll(): Promise<TransactionDoc[]> {
        return this.transactionRepository.findAll();
    }

    findAllSentOrReceived(address: string): Promise<TransactionDoc[]> {
        return this.transactionRepository.findAllFiltered({
            $or: [
                {
                    to: address,
                },
                { from: address },
            ],
        });
    }
}
