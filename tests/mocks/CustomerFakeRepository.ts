import { ICustomer } from '../../src/domain/models/Customer';

let customers = new Array();

export default class CustomerRepository {
  get(_entity: string, customer_id: string) {
    return customers.find((customer) => customer.customer_id === customer_id);
  }
  list() {
    return { Items: customers };
  }
  search(term: string) {
    return { Items: customers.includes(term) };
  }
  delete(entity: string, customer_id: string) {
    customers = customers.filter((customer) => customer.customer_id !== customer_id && customer.entity === entity);
    return {};
  }
  update(customer_data: ICustomer) {
    customers = customers.filter((customer) => customer.customer_id !== customer_data.customer_id);

    customers.push(customer_data);
    return { Attributes: customer_data };
  }
}
