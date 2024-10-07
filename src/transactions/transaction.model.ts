import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
    collection: 'transactions',
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
})
export class TransactionDoc extends Document {
    @Prop({ required: true })
    blockHash: string;

    @Prop({ required: true })
    blockNumber: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    from: string;

    @Prop({ required: true, unique: true })
    hash: string;

    @Prop({ required: true })
    transactionIndex: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    to: string;

    @Prop({ required: true })
    value: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    gas: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    gasPrice: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    type: mongoose.Schema.Types.BigInt;

    @Prop({ default: null })
    maxFeePerGas: mongoose.Schema.Types.BigInt;

    @Prop({ default: null })
    maxPriorityFeePerGas: mongoose.Schema.Types.BigInt;

    @Prop({ default: null })
    data: string;

    @Prop({ required: true })
    input: string;

    @Prop({ required: true })
    nonce: mongoose.Schema.Types.BigInt;

    @Prop({ default: null })
    chain: string;

    @Prop({ default: null })
    hardfork: string;

    @Prop({ required: true })
    chainId: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    v: mongoose.Schema.Types.BigInt;

    @Prop({ required: true })
    r: string;

    @Prop({ required: true })
    s: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionDoc);
