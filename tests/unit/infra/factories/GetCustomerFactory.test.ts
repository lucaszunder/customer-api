import GetCustomerFactory from '../../../../src/infra/factories/GetCustomerFactory.ts';

describe('Test Factory GetCustomer #unit', () => {
  describe('Success Scenarios', () => {
    it('should build GetCustomer useCase', async () => {
      const getCustomerFactory = new GetCustomerFactory();

      expect(getCustomerFactory).toBeInstanceOf(GetCustomerFactory);
      expect(getCustomerFactory).toHaveProperty('make');
    });
  });
});
