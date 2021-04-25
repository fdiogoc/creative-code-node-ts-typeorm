import { Endereco as Address } from '../entities/Endereco';
import { getRepository } from 'typeorm';

import { validate, ValidationError } from 'class-validator';

export class AddressPayload {
  endereco: string;
  numero: number;
  complemento: string;
  cep: number;
  cidade: string;
  estado: string;
}
class FieldError {
  field: string;
  message: string;
}
export class AddressResponse {
  errors?: FieldError[] | ValidationError[];
  address?: Address;
}

export const getAddressList = async (): Promise<Array<Address>> => {
  const addressRepository = getRepository(Address);
  return addressRepository.find();
};

export const createAddress = async (
  payload: AddressPayload,
): Promise<AddressResponse> => {
  try {
    const addressRepository = getRepository(Address);
    const address = addressRepository.create({ ...payload });

    const errors = await validate(address);
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);

      return {
        errors,
      };
    } else {
      const results = await addressRepository.save(address);

      return {
        address: results,
      };
    }
  } catch (error) {
    return error;
  }
};

export const getAddress = async (id: number): Promise<Address | null> => {
  const addressRepository = getRepository(Address);
  const address = await addressRepository.findOne({ id: id });
  if (!address) return null;
  return address;
};

export const getByCEP = async (cep: number): Promise<Address | null> => {
  const userRepository = getRepository(Address);
  const address = await userRepository.findOne({ cep });
  if (!address) return null;
  return address;
};
