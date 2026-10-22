import { faker } from '@faker-js/faker';

export interface Client {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export function createClient(overrides?: Partial<Client>): Client {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode('#####'),
    ...overrides,
  };
}
