import DeleteCustomerFactory from '../../../../src/infra/factories/DeleteCustomerFactory';

describe('Test Factory DeleteCustomer #unit', () => {
  describe('Success Scenarios', () => {
    it('should build DeleteCustomer useCase', async () => {
      const deleteCustomerFactory = new DeleteCustomerFactory();

      expect(deleteCustomerFactory).toBeInstanceOf(DeleteCustomerFactory);
      expect(deleteCustomerFactory).toHaveProperty('make');
    });
  });
});
