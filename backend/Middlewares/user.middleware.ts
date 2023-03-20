import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import { HttpException } from '../Utils';

const fieldError = 'All fields must be filled';

const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': fieldError,
    'string.empty': fieldError,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': fieldError,
    'string.empty': fieldError,
  }),
});

const LoginTypos = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) throw new HttpException(StatusCodes.BAD_REQUEST, `${error.message}`);

  next();
};

export default LoginTypos;
