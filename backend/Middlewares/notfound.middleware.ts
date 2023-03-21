import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpException } from '../Utils';

const NotFoundMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  const { cause, message } = req.errored as HttpException;
  res.status(StatusCodes.NOT_FOUND).json({ message, cause });
};

export default NotFoundMiddleware;
