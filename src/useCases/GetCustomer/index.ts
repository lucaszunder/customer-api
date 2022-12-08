import { ICustomerRepository } from '../../domain/repositories/ICustomer';
import { buildError } from '../../domain/exceptions/buildError';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';

export default class GetCustomerUseCase {
  customerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }
  async handle(customer_id: string | undefined) {
    if (!customer_id) {
      return buildError('ID do usuário não informado', BAD_REQUEST);
    }

    const newCustomer = await this.customerRepository.get('CUSTOMER', customer_id);

    if (Object.keys(newCustomer).length < 1) {
      return buildError('Nenhum usuário encontrado com este ID', NOT_FOUND);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(newCustomer),
    };
  }
}
