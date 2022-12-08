import { ICustomerRepository } from '../../domain/repositories/ICustomer';

export default class ListCustomersUseCase {
  customerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }
  async handle(searchQuery: string | undefined) {
    if (!searchQuery) {
      const newCustomer = await this.customerRepository.list();
      return {
        statusCode: 200,
        //@ts-ignore
        body: JSON.stringify(newCustomer.Items),
      };
    }

    const newCustomer = await this.customerRepository.search(searchQuery);
    return {
      statusCode: 200,
      //@ts-ignore
      body: JSON.stringify(newCustomer.Items),
    };
  }
}
