import { faker } from '@faker-js/faker';
import CreateCustomerUseCase from '../../../../src/useCases/CreateCustomer';
import CustomerRepository from '../../../mocks/CustomerFakeRepository';

describe('Test useCase CreateCustomer #unit', () => {
  const customerRepository = new CustomerRepository();
  //@ts-ignore
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('Success Scenarios', () => {
    it('should create a customer', async () => {
      const name = faker.datatype.string(10);
      const email = faker.datatype.string(15);

      const customerRepositorySpy = jest.spyOn(customerRepository, 'update');
      //@ts-ignore
      const customerResponse = await createCustomerUseCase.handle(name, email);
      expect(customerRepositorySpy).toHaveBeenCalled();
      expect(JSON.parse(customerResponse.body).name).toBe(name);
      expect(JSON.parse(customerResponse.body).email).toBe(email);
    });
  });

  describe('Error Scenarios', () => {
    it('should not create a customer when name is not provided', async () => {
      const name = undefined;
      const email = faker.datatype.string(15);

      const customerRepositorySpy = jest.spyOn(customerRepository, 'update');
      //@ts-ignore
      const customerResponse = await createCustomerUseCase.handle(name, email);

      expect(customerRepositorySpy).not.toHaveBeenCalled();
      expect(customerResponse.statusCode).toBe(400);
      expect(customerResponse.body).toBe(JSON.stringify({ message: 'O campo nome ou email não está preenchido' }));
    });
  });

  describe('Error Scenarios', () => {
    it('should not create a customer when email is not provided', async () => {
      const name = faker.datatype.string(10);
      const email = undefined;

      const customerRepositorySpy = jest.spyOn(customerRepository, 'update');
      //@ts-ignore
      const customerResponse = await createCustomerUseCase.handle(name, email);

      expect(customerRepositorySpy).not.toHaveBeenCalled();
      expect(customerResponse.statusCode).toBe(400);
      expect(customerResponse.body).toBe(JSON.stringify({ message: 'O campo nome ou email não está preenchido' }));
    });
  });
});
