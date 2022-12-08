import UpdateCustomerFactory from '../../../../src/infra/factories/UpdateCustomerFactory';

describe('Test Factory UpdateCustomer #unit', () => {
  describe('Success Scenarios', () => {
    it('should build UpdateCustomer useCase', async () => {
      const updateCustomerFactory = new UpdateCustomerFactory();

      expect(updateCustomerFactory).toBeInstanceOf(UpdateCustomerFactory);
      expect(updateCustomerFactory).toHaveProperty('make');
    });
  });
});
