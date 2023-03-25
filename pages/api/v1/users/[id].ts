import nc from 'next-connect';
import { authenticateMiddleware, ErrorMiddleware, UserTypos } from '@/backend/Middlewares';
import { UserController } from '@/backend/Controllers';

const userController = new UserController();

const handler = nc({ onError: ErrorMiddleware });

handler
  .use(authenticateMiddleware)
  .get(userController.getById)
  .patch(UserTypos, userController.update)
  .delete(userController.delete);

export default handler;
