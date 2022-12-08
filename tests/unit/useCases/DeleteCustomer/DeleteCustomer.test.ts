import { faker } from '@faker-js/faker';
import CreateCustomerUseCase from '../../../../src/useCases/CreateCustomer';
import DeleteCustomerUseCase from '../../../../src/useCases/DeleteCustomer';
import CustomerRepository from '../../../mocks/CustomerFakeRepository';

describe('Test useCase DeleteCustomer #unit', () => {
  const customerRepository = new CustomerRepository();
  //@ts-ignore
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
  //@ts-ignore
  const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('Success Scenarios', () => {
    it('should Delete a customer', async () => {
      const body = {
        name: faker.datatype.string(10),
        email: faker.datatype.string(10),
      };

      const newCustomer = await createCustomerUseCase.handle(body.name, body.email);
      const customerRepositorySpy = jest.spyOn(customerRepository, 'delete');
      const customerBody = JSON.parse(newCustomer.body);
      console.log(customerBody)
      //@ts-ignore
      const customerResponse = await deleteCustomerUseCase.handle(customerBody.customer_id);

      expect(customerRepositorySpy).toHaveBeenCalled();
      expect(customerResponse.body).toBe(JSON.stringify({message: "Usuário deletado com sucesso"}));
    });
  });

  describe('Error Scenarios', () => {
    it('should not Delete a customer when id is not provided', async () => {
      const customerRepositorySpy = jest.spyOn(customerRepository, 'delete');
      const customerResponse = await deleteCustomerUseCase.handle(undefined);

      expect(customerRepositorySpy).not.toHaveBeenCalled();
      expect(customerResponse.statusCode).toBe(400);
      expect(customerResponse.body).toBe(JSON.stringify({message: 'ID do usuário não informado'}));
    });
  });
});
