import * as bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { IUserLogin, IUserAuth } from '../DTOS/user.dto';
import { StatusCodes } from 'http-status-codes';
import { generateJWTToken, HttpException } from '../Utils';

export default class AuthView {
  readonly model = prisma.user;

  public async login(login: IUserLogin): Promise<Omit<IUserAuth, 'password' | 'todos' >> {
    const errorMessage = 'Email ou Senha incorretos';
    if (!login.email || !login.password) {
      throw new HttpException(StatusCodes.BAD_REQUEST, 'Todos os campos devem ser preenchidos');
    }

    const allClients: User[] = await this.model.findMany();

    const clientData = allClients.filter((element) => element.email === (login.email));
    if (clientData.length === 0) throw new HttpException(StatusCodes.UNAUTHORIZED, errorMessage);

    const isMatch = bcrypt.compare(login.password, clientData[0].password as string);
    if (!isMatch) throw new HttpException(StatusCodes.UNAUTHORIZED, errorMessage);

    const token = generateJWTToken({
      id: clientData[0].id,
      email: clientData[0].email,
      name: clientData[0].name,
    });

    return {       
      id: clientData[0].id,
      email: clientData[0].email,
      name: clientData[0].name,
      token, 
      auth: true 
    };
  }
}
