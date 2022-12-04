import {faker} from '@faker-js/faker'
import CreateCustomerUseCase from '../../../../src/useCases/CreateCustomer/CreateCustomer'
import CustomerRepository from '../../../mocks/CustomerFakeRepository'

describe('Test useCase CreateCustomer #unit', () => {
  const customerRepository = new CustomerRepository()
  //@ts-ignore
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
  
  afterEach(()=> {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('Success Scenarios', () => {
    it('should create a customer', async () => {
      const body = {
        name:faker.datatype.string(5),
        email: faker.datatype.string(15)
      }
      //@ts-ignore
      const customerRepositorySpy = jest.spyOn(customerRepository, 'create')
      const customerResponse = await createCustomerUseCase.handle(body);   
      
      expect(customerRepositorySpy).toHaveBeenCalled()
      expect(JSON.parse(customerResponse.body).name).toBe(body.name)
      expect(JSON.parse(customerResponse.body).email).toBe(body.email)
    });
    
  });

  describe('Error Scenarios', () => {
    it('should not create a customer when name is not provided', async () => {
      const body = {
        name: undefined,
        email: faker.datatype.string(15)
      }

      const customerRepositorySpy = jest.spyOn(customerRepository, 'create')
      const customerResponse = await createCustomerUseCase.handle(body);   
      
      expect(customerRepositorySpy).not.toHaveBeenCalled()     
      expect(customerResponse.statusCode).toBe(400)
      expect(customerResponse.body).toBe('O campo nome ou email não está preenchido')
    });
  });

  describe('Error Scenarios', () => {
    it('should not create a customer when email is not provided', async () => {
      const body = {
        name: faker.datatype.string(5),
        email: undefined
      }
      const customerRepositorySpy = jest.spyOn(customerRepository, 'create')
      const customerResponse = await createCustomerUseCase.handle(body);   
      
      expect(customerRepositorySpy).not.toHaveBeenCalled()
      expect(customerResponse.statusCode).toBe(400)
      expect(customerResponse.body).toBe('O campo nome ou email não está preenchido')
    });
    
  });
});
