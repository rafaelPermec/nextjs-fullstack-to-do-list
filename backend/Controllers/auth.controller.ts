import { NextApiResponse, NextApiRequest } from 'next';
import { StatusCodes } from 'http-status-codes';
import { AuthView } from '../Views';

export default class AuthController {
  private view: AuthView;

  constructor() {
    this.view = new AuthView();
  }

  public authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
    const logged = await this.view.login(req.body);
    req.headers.authorization = logged.token;
    res.status(StatusCodes.CREATED).json(logged);
  };
}