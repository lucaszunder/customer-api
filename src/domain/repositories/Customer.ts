import AWS, { AWSError } from 'aws-sdk';
import { DeleteItemOutput, GetItemOutput, ScanOutput, UpdateItemOutput } from 'aws-sdk/clients/dynamodb';
import { ICustomer } from '../models/Customer';

export class CustomerRepository {
  dynamoClient;
  constructor() {
    this.dynamoClient = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-1',
      endpoint: 'http://172.19.0.2:4566',
    });
  }

  async get(entity: string, customer_id: string): Promise<GetItemOutput | AWSError> {
    try {
      return await this.dynamoClient
        .get({
          TableName: 'customers',
          Key: { entity: entity, customer_id: customer_id },
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
        .query({
          TableName: 'customers',
          ExpressionAttributeNames: {
            '#entity': 'entity',
          },
          ExpressionAttributeValues: {
            ':entity': 'CUSTOMER',
          },
          KeyConditionExpression: '#entity = :entity',
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  async search(query: string): Promise<ScanOutput | AWSError> {
    try {
      return await this.dynamoClient
        .query({
          TableName: 'customers',
          ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email',
            '#entity': 'entity',
          },
          ExpressionAttributeValues: {
            ':entity': 'CUSTOMER',
            ':email': query,
            ':name': query,
          },
          FilterExpression: 'begins_with(#email, :email) or begins_with(#name, :name)',
          KeyConditionExpression: '#entity = :entity',
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  async create(params: ICustomer): Promise<UpdateItemOutput | AWSError> {
    try {
      return await this.dynamoClient
        .update({
          TableName: 'customers',
          Key: { entity: params.entity, customer_id: params.customer_id },
          UpdateExpression: 'set #name = :v_name, #email = :v_email',
          ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email',
          },
          ExpressionAttributeValues: {
            ':v_name': params.name,
            ':v_email': params.email,
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  async update(params: ICustomer): Promise<UpdateItemOutput | AWSError> {
    try {
      return await this.dynamoClient
        .update({
          TableName: 'customers',
          Key: { entity: params.entity, customer_id: params.customer_id },
          UpdateExpression: 'set #name = :v_name, #email = :v_email',
          ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email',
          },
          ExpressionAttributeValues: {
            ':v_name': params.name,
            ':v_email': params.email,
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  async delete(entity: string, customer_id: string): Promise<DeleteItemOutput | AWSError> {
    try {
      return await this.dynamoClient
        .delete({
          TableName: 'customers',
          Key: { entity: entity, customer_id: customer_id },
        })
        .promise();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }
}
