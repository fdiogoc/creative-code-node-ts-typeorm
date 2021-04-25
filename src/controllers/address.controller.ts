import {
  AddressPayload,
  AddressResponse,
  createAddress,
  getAddress,
  getAddressList,
  getByCEP,
} from '../repositories/address.repository';
import { Endereco as Address } from '../entities/Endereco';

export default class AddressController {
  public async getAddressList(): Promise<Array<Address>> {
    return getAddressList();
  }

  public async createAddress(body: AddressPayload): Promise<AddressResponse> {
    return createAddress(body);
  }

  public async getAddress(id: string): Promise<Address | null> {
    return getAddress(Number(id));
  }

  public async getByCEP(cep: string): Promise<Address | null> {
    return getByCEP(Number(cep));
  }
}
