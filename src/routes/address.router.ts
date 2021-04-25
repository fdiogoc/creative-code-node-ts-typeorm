import express from 'express';
import AddressController from '../controllers/address.controller';

const router = express.Router();

router.get('/', async (_req, res) => {
  const controller = new AddressController();
  const response = await controller.getAddressList();
  return res.send(response);
});

router.post('/', async (req, res) => {
  const controller = new AddressController();
  const response = await controller.createAddress(req.body);
  return res.send(response);
});

router.get('/:id', async (req, res) => {
  const controller = new AddressController();
  const response = await controller.getAddress(req.params.id);
  if (!response) res.status(404).send({ message: 'Endereço não encontrado' });
  return res.send(response);
});

router.get('byCEP/:cep', async (req, res) => {
  const controller = new AddressController();
  const response = await controller.getByCEP(req.params.cep);
  if (!response) res.status(404).send({ message: 'Endereço não encontrado' });
  return res.send(response);
});

export default router;
