import nc from 'next-connect';
import { authenticateMiddleware, ErrorMiddleware, NotFoundMiddleware } from '@/backend/Middlewares';
import { TodoController } from '@/backend/Controllers';

const todoController = new TodoController();

const handler = nc({ onError: ErrorMiddleware, onNoMatch: NotFoundMiddleware });

handler
  .use(authenticateMiddleware)
  .get(todoController.getById)
  .patch(todoController.update);

export default handler;
