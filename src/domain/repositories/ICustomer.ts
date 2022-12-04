import { AWSError } from 'aws-sdk';
import { GetItemOutput, PutItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { ICustomer } from '../models/Customer';

export interface ICustomerRepository {
  create(params: ICustomer): Promise<PutItemOutput | AWSError>;
  get(customer_id: string): Promise<GetItemOutput | AWSError>;
  list(): Promise<ScanOutput | AWSError>;
}
