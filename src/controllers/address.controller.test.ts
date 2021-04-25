import AddressController from './address.controller';
import * as AddressRepository from '../repositories/address.repository';
import {
  generateAddressData,
  generateAddressPayload,
  generateAdressesData,
} from '../../test/utils/generate';
import { Endereco } from '../entities/Endereco';
import { AddressResponse } from '../repositories/address.repository';

afterEach(() => {
  jest.resetAllMocks();
});

describe('AddressController', () => {
  describe('getAddressList', () => {
    test('should return empty array', async () => {
      const spy = jest
        .spyOn(AddressRepository, 'getAddressList')
        .mockResolvedValueOnce([]);
      const controller = new AddressController();
      const addresses = await controller.getAddressList();
      expect(addresses).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return address list', async () => {
      const addressList = generateAdressesData(2);
      const spy = jest
        .spyOn(AddressRepository, 'getAddressList')
        .mockResolvedValueOnce(addressList);
      const controller = new AddressController();
      const addresses = await controller.getAddressList();
      expect(addresses).toEqual(addressList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    describe('addAddress', () => {
      test('should add address to the database', async () => {
        const payload = generateAddressPayload();
        const addressData = generateAddressData(payload);
        const addressResponse: AddressResponse = { address: payload };
        const spy = jest
          .spyOn(AddressRepository, 'createAddress')
          .mockResolvedValueOnce(addressResponse);
        const controller = new AddressController();
        const address = await controller.createAddress(payload);
        expect(address.address).toMatchObject(payload);
        expect(address.address).toEqual(addressData);
        expect(spy).toHaveBeenCalledWith(payload);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('getaddress ', () => {
      test('should return address from the database', async () => {
        const id = 1;
        const addressData = generateAddressData({ id });
        const spy = jest
          .spyOn(AddressRepository, 'getAddress')
          .mockResolvedValueOnce(addressData as Endereco);
        const controller = new AddressController();
        const address = await controller.getAddress(id.toString());
        expect(address).toEqual(addressData);
        expect(address?.id).toBe(id);
        expect(spy).toHaveBeenCalledWith(id);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      test('should return null if user not found', async () => {
        const id = 1;
        const spy = jest
          .spyOn(AddressRepository, 'getAddress')
          .mockResolvedValueOnce(null);
        const controller = new AddressController();
        const address = await controller.getAddress(id.toString());
        expect(address).toBeNull();
        expect(spy).toHaveBeenCalledWith(id);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('getaddressFromCEP', () => {
      test('should return address from the database', async () => {
        const id = 1;
        const addressData = generateAddressData({ id });
        addressData.cep = 123123;
        const spy = jest
          .spyOn(AddressRepository, 'getByCEP')
          .mockResolvedValueOnce(addressData as Endereco);
        const controller = new AddressController();
        const address = await controller.getByCEP(id.toString());
        expect(address).toEqual(addressData);
        expect(address?.id).toBe(id);
        expect(spy).toHaveBeenCalledWith(id);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      test('should return null if user not found', async () => {
        const id = 1;
        const spy = jest
          .spyOn(AddressRepository, 'getAddress')
          .mockResolvedValueOnce(null);
        const controller = new AddressController();
        const user = await controller.getAddress(id.toString());
        expect(user).toBeNull();
        expect(spy).toHaveBeenCalledWith(id);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
