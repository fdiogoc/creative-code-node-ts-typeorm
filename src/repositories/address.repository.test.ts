import * as AddressRepository from './address.repository';
import { getRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import {
  generateAddressData,
  generateAdressesData,
} from '../../test/utils/generate';
import {} from 'supertest';
jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));

beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.save.mockClear();
  mockedGetRepo.findOne.mockClear();
});

describe('addressRepository', () => {
  describe('getaddresss', () => {
    test('should return empty array', async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const addresss = await AddressRepository.getAddressList();
      expect(addresss).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    test('should return address list', async () => {
      const addresssData = generateAdressesData(2);
      mockedGetRepo.find.mockResolvedValue(addresssData);
      const addresss = await AddressRepository.getAddressList();
      expect(addresss).toEqual(addresssData);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    describe('Createaddress', () => {
      // test('should create address', async () => {
      //   const payload = generateAddressPayload();
      //   const addressData = generateAddressData(payload);
      //   mockedGetRepo.save.mockResolvedValue(addressData);
      //   const address = await AddressRepository.createAddress(payload);
      //   expect(address).toMatchObject(payload);
      //   expect(address).toEqual(addressData);
      //   expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
      //   expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
      // });
    });
  });
  describe('getaddress', () => {
    test('should return address from the database', async () => {
      const id = 1;
      const addressData = generateAddressData({ id });
      mockedGetRepo.findOne.mockResolvedValue(addressData);
      const address = await AddressRepository.getAddress(id);
      expect(address).toEqual(addressData);
      expect(address?.id).toBe(id);
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });

    test('should return null if address not found', async () => {
      const id = 1;
      mockedGetRepo.findOne.mockResolvedValue(null);
      const address = await AddressRepository.getAddress(id);
      expect(address).toBeNull();
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({ id });

      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('getaddressByEmail', () => {
    test('should return address from the database', async () => {
      const id = 1;
      const addressData = generateAddressData({ id });
      mockedGetRepo.findOne.mockResolvedValue(addressData);
      const address = await AddressRepository.getByCEP(addressData.cep);
      expect(address).toEqual(addressData);
      expect(address?.id).toBe(id);
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({
        cep: addressData.cep,
      });
      expect(address?.id).toBe(id);
      expect(address?.cep).toBe(addressData.cep);
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
