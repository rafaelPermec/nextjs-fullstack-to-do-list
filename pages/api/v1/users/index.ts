import nc from 'next-connect';
import { ErrorMiddleware, UserTypos, NotFoundMiddleware } from '@/backend/Middlewares';
import { UserController } from '@/backend/Controllers';

const userController = new UserController();

const handler = nc({ onError: ErrorMiddleware, onNoMatch: NotFoundMiddleware });

handler
  .use(UserTypos)
  .post(userController.create);

export default handler;
