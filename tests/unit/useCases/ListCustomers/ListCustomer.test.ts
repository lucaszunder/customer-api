import { faker } from '@faker-js/faker';
import CreateCustomerUseCase from '../../../../src/useCases/CreateCustomer';
import ListCustomerUseCase from '../../../../src/useCases/ListCustomers';
import CustomerRepository from '../../../mocks/CustomerFakeRepository';

describe('Test useCase ListCustomer #unit', () => {
  const customerRepository = new CustomerRepository();
  //@ts-ignore
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
  //@ts-ignore
  const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('Success Scenarios', () => {
    it('should List a customer', async () => {
      const body = {
        name: faker.datatype.string(10),
        email: faker.datatype.string(10),
      };
      let search

      const newCustomer = await createCustomerUseCase.handle(body.name, body.email);
      const customerRepositorySpy = jest.spyOn(customerRepository, 'list');
      console.log(newCustomer)

      const customerResponse = await listCustomerUseCase.handle(search);
      console.log(customerResponse)
      expect(customerRepositorySpy).toHaveBeenCalled();
      expect(customerResponse.body).toBe(`[${newCustomer.body}]`);
    });
  });
});
