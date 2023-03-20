import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { HttpException } from '../Utils';

const passwordRegex = RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`);

const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Insira seu email',
    'string.empty': 'Insira seu email',
    'string.email': 'Insira um email válido',
  }),
  name: Joi.string().min(3).required().messages({
    'any.required': 'Insira seu nome',
    'string.empty': 'Insira seu nome',
    'string.min': 'Seu nome deve conter pelo menos 3 caracteres',
  }),
  password: Joi.string().regex(passwordRegex).messages({
    'string.pattern.base': 'As senhas devem conter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial',
  }),
});

const LoginTypos = (req: NextApiRequest, _res: NextApiResponse, next: () => void) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) throw new HttpException(StatusCodes.BAD_REQUEST, `${error.message}`);

  next();
};

export default LoginTypos;
