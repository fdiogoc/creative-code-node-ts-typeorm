import faker from 'faker';
import { Etnia, Usuario } from '../../src/entities/Usuario';
import { Endereco } from '../../src/entities/Endereco';

export function generateUserData(overide = {}) {
  return {
    id: 0,
    email: faker.internet.email(),
    password: faker.internet.password(),
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
    password: faker.internet.password(),
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
      return generateUserData({ id: i, ...overide }) as Usuario;
    },
  );
}

export function generateAddressData(overide = {}) {
  return {
    endereco: faker.address.streetName(),
    numero: faker.datatype.number(120),
    cep: faker.datatype.number(12220),
    cidade: faker.address.city(),
    estado: faker.address.stateAbbr(),
    complemento: faker.address.direction(),
    ...overide,
  };
}

export function generateAddressPayload() {
  return {
    id: faker.datatype.number(),
    endereco: faker.address.streetName(),
    numero: faker.datatype.number(120),
    cep: faker.datatype.number(12220),
    cidade: faker.address.city(),
    estado: faker.address.stateAbbr(),
    complemento: faker.address.direction(),
  };
}

export function generateAdressesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateAddressData({ id: i, ...overide }) as Endereco;
    },
  );
}
