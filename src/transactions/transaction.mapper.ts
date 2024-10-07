import { TransactionDto } from './transaction.dto';
import { TransactionDoc } from './transaction.model';

export const fromTransactionModelToDto = (model: TransactionDoc): TransactionDto => ({
    blockHash: model.blockHash,
    blockNumber: model.blockNumber?.toString(),
    from: model.from,
    hash: model.hash,
    transactionIndex: model.transactionIndex?.toString(),
    to: model.to,
    value: model.value?.toString(),
    gas: model.gas?.toString(),
    gasPrice: model.gasPrice?.toString(),
    type: model.type?.toString(),
    maxFeePerGas: model.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: model.maxPriorityFeePerGas?.toString(),
    data: model.data,
    input: model.input,
    nonce: model.nonce?.toString(),
    chain: model.chain,
    hardfork: model.hardfork,
    chainId: model.chainId?.toString(),
    v: model.v?.toString(),
    r: model.r,
    s: model.s,
});
