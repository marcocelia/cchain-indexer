export class TransactionDto {
    readonly blockHash: string;
    readonly blockNumber: string;
    readonly from: string;
    readonly hash: string;
    readonly transactionIndex: string;
    readonly to: string;
    readonly value: string;
    readonly gas: string;
    readonly gasPrice: string;
    readonly type: string;
    readonly maxFeePerGas: string;
    readonly maxPriorityFeePerGas: string;
    readonly data: string;
    readonly input: string;
    readonly nonce: string;
    readonly chain: string;
    readonly hardfork: string;
    readonly chainId: string;
    readonly v: string;
    readonly r: string;
    readonly s: string;
}
