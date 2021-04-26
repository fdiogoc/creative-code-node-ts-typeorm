import express from 'express';

import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', async (req, res, _next) => {
  const controller = new AuthController();
  const response = await controller.register(req.body, req);
  return res.send(response);
});

router.post('/login', async (req, res, _next) => {
  const controller = new AuthController();
  const response = await controller.login(
    req.body.email,
    req.body.password,
    req,
  );
  return res.send(response);
});

router.post('/logout', async (req, res, _next) => {
  const controller = new AuthController();
  const response = await controller.logout(req, res);
  return res.send(response);
});
//Change my password
// router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
