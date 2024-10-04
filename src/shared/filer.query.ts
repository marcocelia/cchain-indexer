import { SortOrder } from 'mongoose';
import { TransactionDoc } from '../transactions/transaction.model';

export type Sort = { [key in keyof TransactionDoc]?: SortOrder };
export type AndFilter = { [key in keyof TransactionDoc]?: TransactionDoc[key] };
export type OrFilter = Array<AndFilter>;
export type Filter = AndFilter & { or?: OrFilter };
