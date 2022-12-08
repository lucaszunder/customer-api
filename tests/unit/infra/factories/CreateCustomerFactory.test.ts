import CreateCustomerFactory from '../../../../src/infra/factories/CreateCustomerFactory';

describe('Test Factory CreateCustomer #unit', () => {
  describe('Success Scenarios', () => {
    it('should build createCustomer useCase', async () => {
      const createCustomerFactory = new CreateCustomerFactory();

      expect(createCustomerFactory).toBeInstanceOf(CreateCustomerFactory);
      expect(createCustomerFactory).toHaveProperty('make');
    });
  });
});
