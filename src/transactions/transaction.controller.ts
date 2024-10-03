import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { fromTransactionModelToDto } from './transaction.mapper';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @Get()
    findAll(@Query('address') address: string) {
        return this.service.findAllSentOrReceived(address).then((models) => models.map(fromTransactionModelToDto));
    }
}
