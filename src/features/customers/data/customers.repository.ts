import { MOCK_CUSTOMERS } from './customers.mock';

export function getCustomers() {
  return MOCK_CUSTOMERS;
}

export function getCustomerById(id: string) {
  return MOCK_CUSTOMERS.find(customer => customer.id === id);
}
