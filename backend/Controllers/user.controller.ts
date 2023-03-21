import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { IUser } from '../DTOS/user.dto';
import { UserView } from '../Views';

export default class UserController {
  private view: UserView;

  constructor() {
    this.view = new UserView();
  }

  public getById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const user = await this.view.getById(Number(id));
    res.status(StatusCodes.OK).json(user);
  }

  public create = async (req: NextApiRequest, res: NextApiResponse) => {
    const newUser = req.body as IUser;
    const user = await this.view.create(newUser);
    res.status(StatusCodes.CREATED).json(user);
  }

  public update = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const updatedUser = req.body as IUser;
    const user = await this.view.update(Number(id), updatedUser);
    res.status(StatusCodes.OK).json(user);
  }

  public delete = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const user = await this.view.delete(Number(id));
    res.status(StatusCodes.OK).json(user);
  }
}
