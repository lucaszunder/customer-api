import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import GetCustomerFactory from '../../infra/factories/GetCustomerFactory.ts';

export const handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  const customerId = event?.pathParameters?.id;

  const getCustomer = new GetCustomerFactory().make();

  const customerResponse = await getCustomer.handle(customerId);

  callback(null, customerResponse);
};
