import nc from 'next-connect';
import { authenticateMiddleware, ErrorMiddleware, LoginTypos } from '@/backend/Middlewares';
import { AuthController } from '@/backend/Controllers';
import { Cookie } from 'next/font/google/index';

const authController = new AuthController();

const handler = nc({ onError: ErrorMiddleware });

handler
  .post(LoginTypos, authController.authenticate)
  .get(authenticateMiddleware);

export default handler;
