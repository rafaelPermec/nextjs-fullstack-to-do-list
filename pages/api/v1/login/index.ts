import nc from 'next-connect';
import { authenticateMiddleware, ErrorMiddleware, LoginTypos, NotFoundMiddleware } from '@/backend/Middlewares';
import { AuthController } from '@/backend/Controllers';

const authController = new AuthController();

const handler = nc({ onError: ErrorMiddleware, onNoMatch: NotFoundMiddleware });

handler
  .post(LoginTypos, authController.authenticate)
  .get(authenticateMiddleware);

export default handler;
