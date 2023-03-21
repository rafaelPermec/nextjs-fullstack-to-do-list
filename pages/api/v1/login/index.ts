import nc from 'next-connect';
import { authenticateMiddleware, ErrorMiddleware, LoginTypos, NotFoundMiddleware } from '@/backend/Middlewares';
import { AuthController } from '@/backend/Controllers';

const authController = new AuthController();

const handler = nc({ onError: ErrorMiddleware, onNoMatch: NotFoundMiddleware });

handler
  .get(authenticateMiddleware)
  .post(LoginTypos, authController.authenticate);

export default handler;
