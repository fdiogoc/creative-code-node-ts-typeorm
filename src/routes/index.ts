import express from 'express';

import UserRouter from './user.router';
import AuthRouter from './auth.router';
import AddressRouter from './address.router';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/address', isAuth, AddressRouter);

export default router;
