import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import { HttpException } from '../Utils';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../DTOS/user.dto';
import 'dotenv/config';

const JWT_SECRET = process.env.TOKEN_SECRET || 'TodoList';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateJWTToken = (user: Omit<IUser, 'password'>) =>
  sign({ user }, JWT_SECRET, jwtConfig);

const authToken = async (token: string | undefined): Promise<string | JwtPayload> => {
  if (!token) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
  }
  try {
    const validate = verify(token, JWT_SECRET);
    return validate;
  } catch (error) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
  }
};

export { generateJWTToken, authToken };
