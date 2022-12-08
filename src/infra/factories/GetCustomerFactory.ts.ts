import { CustomerRepository } from '../../domain/repositories/Customer';
import GetCustomerUseCase from '../../useCases/GetCustomer';

export default class GetCustomerFactory {
  make() {
    const customerRepository = new CustomerRepository();

    const getCustomer = new GetCustomerUseCase(customerRepository);

    return getCustomer;
  }
}
