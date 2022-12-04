import { ICustomer } from '../../domain/models/Customer';
import { ICustomerRepository } from '../../domain/repositories/ICustomer';
import { buildError } from '../../domain/exceptions/buildError';

import { v4 } from 'uuid';

export default class CreateCustomerUseCase {
  customerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }
  async handle(params: Omit<ICustomer, 'customer_id'>) {
    if (!params.name || !params.email) {
      return buildError('O campo nome ou email não está preenchido', 400);
    }

    const customerParam = {
      customer_id: v4(),
      name: params.name,
      email: params.email,
    };

    const newCustomer = await this.customerRepository.create(customerParam);
    return {
      statusCode: 200,
      body: JSON.stringify(newCustomer),
    };
  }
}
