import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import UpdateCustomerFactory from '../../infra/factories/UpdateCustomerFactory';

export const handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  const customer_id = event?.pathParameters?.id;
  const { name, email } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const updateCustomer = new UpdateCustomerFactory().make();

  const updatedCustomer = await updateCustomer.handle({ customer_id, name, email });

  callback(null, updatedCustomer);
};
