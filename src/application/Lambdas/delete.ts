import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import DeleteCustomerFactory from '../../infra/factories/DeleteCustomerFactory';

export const handler = async (
  event: APIGatewayEvent,
  _context: Context,
  callback: APIGatewayProxyCallback,
): Promise<void> => {
  const customerId = event?.pathParameters?.id;

  const deleteCustomer = new DeleteCustomerFactory().make();

  const customerResponse = await deleteCustomer.handle(customerId);

  callback(null, customerResponse);
};
