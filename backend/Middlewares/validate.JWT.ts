import { NextApiRequest, NextApiResponse } from "next";
import { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { authToken, HttpException } from '../Utils';

const authenticateMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
): Promise<void> => {
  const { authorization } = req.headers;
  const user = await authToken(authorization) as JwtPayload;
  if (!user) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
  }
  res.setHeader('locals', JSON.stringify({...user, token: authorization}));
  req.cookies = (JSON.stringify({ ...req.cookies, ...user, token: authorization })) as any;

  res.status(StatusCodes.OK).json({ message: 'Authenticated', auth: true });
  
  next();
};

export { authenticateMiddleware };