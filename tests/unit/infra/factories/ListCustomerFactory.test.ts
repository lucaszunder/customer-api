import ListCustomerFactory from '../../../../src/infra/factories/ListCustomersFactory.ts';

describe('Test Factory ListCustomer #unit', () => {
  describe('Success Scenarios', () => {
    it('should build ListCustomer useCase', async () => {
      const listCustomerFactory = new ListCustomerFactory();

      expect(listCustomerFactory).toBeInstanceOf(ListCustomerFactory);
      expect(listCustomerFactory).toHaveProperty('make');
    });
  });
});
