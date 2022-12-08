import { ICustomerRepository } from '../../domain/repositories/ICustomer';
import { buildError } from '../../domain/exceptions/buildError';
import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from 'http-status';

export default class DeleteCustomerUseCase {
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
      return buildError('Nenhum usuário encontrado com este ID', UNPROCESSABLE_ENTITY);
    }

    await this.customerRepository.delete('CUSTOMER', customer_id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuário deletado com sucesso' }),
    };
  }
}
