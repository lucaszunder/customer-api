import { CustomerRepository } from '../../domain/repositories/Customer';
import CreateCustomerUseCase from '../../useCases/CreateCustomer/CreateCustomer';

export default class CreateCustomerFactory {
  make() {
    const customerRepository = new CustomerRepository();

    const createCustomer = new CreateCustomerUseCase(customerRepository);
    return createCustomer;
  }
}
