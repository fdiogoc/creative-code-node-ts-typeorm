import faker from 'faker';
import { Etnia } from '../../src/entities/Usuario';
import { IUsuarioPayload } from '../../src/repositories/user.repository';

export function generateUserData(overide = {}) {
  return {
    email: faker.internet.email(),
    senha: faker.internet.password(),
    peso: faker.datatype.number(120),
    idade: faker.datatype.number(99),
    telefone: faker.phone.phoneNumber(),
    etnia: faker.random.arrayElement(Object.values(Etnia)),
    ...overide,
  };
}

export function generateUserPayload() {
  return {
    id: faker.datatype.number(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
    peso: faker.datatype.number(120),
    idade: faker.datatype.number(99),
    telefone: faker.phone.phoneNumber(),
    etnia: faker.random.arrayElement(Object.values(Etnia)),
  };
}

export function generateUsersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserData({ id: i, ...overide }) as IUsuarioPayload;
    },
  );
}
