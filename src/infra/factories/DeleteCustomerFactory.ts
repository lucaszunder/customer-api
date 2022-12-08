import { CustomerRepository } from '../../domain/repositories/Customer';
import DeleteCustomerUseCase from '../../useCases/DeleteCustomer';

export default class DeleteCustomerFactory {
  make() {
    const customerRepository = new CustomerRepository();

    const deletedCustomer = new DeleteCustomerUseCase(customerRepository);
    return deletedCustomer;
  }
}
