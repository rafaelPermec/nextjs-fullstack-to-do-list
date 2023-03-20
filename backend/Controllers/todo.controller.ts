import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { TodoView } from '../Views';

export default class TodoController {
  private view: TodoView;

  constructor() {
    this.view = new TodoView();
  }

  public getById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const todos = await this.view.getById(Number(id));
    res.status(StatusCodes.OK).json(todos);
  }

  public update = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const todoList = req.body as string[];
    const todos = await this.view.update(Number(id), todoList);
    res.status(StatusCodes.OK).json(todos);
  }

}
