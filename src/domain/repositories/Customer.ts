import AWS, { AWSError } from 'aws-sdk';
import { GetItemOutput, PutItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import { ICustomer } from '../models/Customer';

export class CustomerRepository {
  dynamoClient;
  constructor() {
    this.dynamoClient = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-1',
      endpoint: 'http://172.19.0.2:4566',
    });
  }

  async create(params: ICustomer): Promise<PutItemOutput | AWSError> {
    try {
      return await this.dynamoClient
        .put({
          TableName: 'customers',
          Item: params,
          ReturnValues: 'ALL_OLD',
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }
  async get(customer_id: string): Promise<GetItemOutput | AWSError> {
    try {
      return await this.dynamoClient
        .get({
          TableName: 'customers',
          Key: { customer_id },
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  async list(): Promise<ScanOutput | AWSError> {
    try {
      return await this.dynamoClient
        .scan({
          TableName: 'customers',
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  //   async search(query: string): Promise<any> {

  // }

  //   async update(params: ICustomer): Promise<any> {

  //   }

  //   async delete(customer_id: string): Promise<any> {

  // }
}
