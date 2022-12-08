import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from 'http-status';
import { ICustomerRepository } from '../../domain/repositories/ICustomer';
import { buildError } from '../../domain/exceptions/buildError';
import { ICustomer } from '../../domain/models/Customer';

export default class UpdateCustomerUseCase {
  customerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }
  async handle({ customer_id, email, name }: Omit<ICustomer, 'entity'>) {
    if (!customer_id) {
      return buildError('ID do usuário não informado', BAD_REQUEST);
    }

    if (!email || !name) {
      return buildError('nome ou email não informados para alteracão', BAD_REQUEST);
    }

    const newCustomer = await this.customerRepository.get('CUSTOMER', customer_id);

    if (Object.keys(newCustomer).length < 1) {
      return buildError('Nenhum usuário encontrado com este ID', UNPROCESSABLE_ENTITY);
    }

    const updatedCustomer = await this.customerRepository.update({ entity: 'CUSTOMER', customer_id, email, name });

    return {
      statusCode: 200,
      //@ts-ignore
      body: JSON.stringify(updatedCustomer?.Attributes),
    };
  }
}
