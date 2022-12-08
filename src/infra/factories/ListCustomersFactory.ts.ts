import { CustomerRepository } from '../../domain/repositories/Customer';
import ListCustomersUseCase from '../../useCases/ListCustomers';

export default class ListCustomerFactory {
  make() {
    const customerRepository = new CustomerRepository();

    const ListCustomer = new ListCustomersUseCase(customerRepository);
    return ListCustomer;
  }
}
