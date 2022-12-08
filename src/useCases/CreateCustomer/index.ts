import { v4 } from 'uuid';
import { BAD_REQUEST } from 'http-status';

import { ICustomerRepository } from '../../domain/repositories/ICustomer';
import { buildError } from '../../domain/exceptions/buildError';

export default class CreateCustomerUseCase {
  customerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }
  async handle(name: string, email: string) {
    if (!name || !email) {
      return buildError('O campo nome ou email não está preenchido', BAD_REQUEST);
    }

    const customerParam = {
      entity: 'CUSTOMER',
      customer_id: v4(),
      name: name,
      email: email,
    };

    const newCustomer = await this.customerRepository.update(customerParam);

    return {
      statusCode: 200,
      //@ts-ignore
      body: JSON.stringify(newCustomer?.Attributes),
    };
  }
}
