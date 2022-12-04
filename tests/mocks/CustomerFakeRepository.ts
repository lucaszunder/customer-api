import { ICustomer } from '../../src/domain/models/Customer';

const customers = new Array();

export default class CustomerRepository {
  create(customerData: ICustomer) {

    customers.push(customerData);
    return customerData;
  }
  get() {
    return {}
  }
  list() {
    return {}
  }
}
