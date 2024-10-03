import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Web3 } from 'web3';
import { AppLogger } from '../app-logger/app-logger';
import { TransactionRepository } from '../transactions/transaction.repository';
import { TransactionDoc } from '../transactions/transaction.model';

@Injectable()
export class ContractStreamer {
    private readonly web3: Web3;

    constructor(
        private readonly logger: AppLogger,
        private readonly transactionRepository: TransactionRepository,
    ) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));
    }

    @Interval(10 * 1000)
    async handleCron() {
        try {
            const latestBlock = await this.web3.eth.getBlockNumber();
            const block = await this.web3.eth.getBlock(latestBlock, true);
            const created = await Promise.all(
                block.transactions.map(async (transaction): Promise<TransactionDoc | undefined> => {
                    try {
                        return await this.transactionRepository.create(transaction);
                    } catch (error) {
                        this.logger.error(`while crearing transaction: ${error.message}`);
                        return undefined;
                    }
                }),
            );
            this.logger.log(`created ${created.length} new transactions`);
        } catch (error) {
            this.logger.error(`while polling transactions: ${error.message}`);
        }
    }
}
