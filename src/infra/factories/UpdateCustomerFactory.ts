import { CustomerRepository } from '../../domain/repositories/Customer';
import UpdateCustomerUseCase from '../../useCases/UpdateCustomer';

export default class UpdateCustomerFactory {
  make() {
    const customerRepository = new CustomerRepository();

    const updatedCustomer = new UpdateCustomerUseCase(customerRepository);
    return updatedCustomer;
  }
}
