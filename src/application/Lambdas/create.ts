import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import CreateCustomerFactory from '../../infra/factories/CreateCustomerFactory';

export const handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  const createCustomer = new CreateCustomerFactory().make();
  const { name, email } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const newCustomer = await createCustomer.handle(name, email);

  console.log(newCustomer);

  callback(null, newCustomer);
};
