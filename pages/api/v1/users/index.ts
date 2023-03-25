import nc from 'next-connect';
import { ErrorMiddleware, UserTypos } from '@/backend/Middlewares';
import { UserController } from '@/backend/Controllers';

const userController = new UserController();

const handler = nc({ onError: ErrorMiddleware });

handler
  .use(UserTypos)
  .post(userController.create);

export default handler;
