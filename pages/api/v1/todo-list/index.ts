import nc from 'next-connect';
import { authenticateMiddleware, ErrorMiddleware } from '@/backend/Middlewares';
import { TodoController } from '@/backend/Controllers';

const todoController = new TodoController();

const handler = nc({ onError: ErrorMiddleware });

handler
  .use(authenticateMiddleware)
  .patch(todoController.update);

export default handler;
