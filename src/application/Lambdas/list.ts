import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import ListCustomerFactory from '../../infra/factories/ListCustomersFactory.ts';

export const handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  const search = event?.queryStringParameters?.search;

  const listCustomer = new ListCustomerFactory().make();

  const customerResponse = await listCustomer.handle(search);

  callback(null, customerResponse);
};
