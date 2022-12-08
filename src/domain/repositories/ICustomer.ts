import { AWSError } from 'aws-sdk';
import { GetItemOutput, ScanOutput, DeleteItemOutput, UpdateItemOutput } from 'aws-sdk/clients/dynamodb';
import { ICustomer } from '../models/Customer';

export interface ICustomerRepository {
  get(entity: string, customer_id: string): Promise<GetItemOutput | AWSError>;
  list(): Promise<ScanOutput | AWSError>;
  search(query: string): Promise<ScanOutput | AWSError>;
  delete(entity: string, customer_id: string): Promise<DeleteItemOutput | AWSError>;
  update(params: ICustomer): Promise<UpdateItemOutput | AWSError>;
}
