import * as bcrypt from 'bcryptjs';
import StatusCodes from 'http-status-codes';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { IUser } from '../DTOS/user.backend.dto';
import { HttpException } from '../Utils';
import { seedPostLoginSchema } from '@/database/seed.postlogin';

export default class UserView {
  readonly model = prisma.user;

  private async getAll(): Promise<IUser[]> {
    const user = await this.model.findMany();
    if (!user) throw new HttpException(StatusCodes.NOT_FOUND, 'Alguém deu DELETE sem WHERE por aqui.');
    return user as IUser[];
  }

  public async getById(id: number): Promise<IUser> {
    const user = await this.model.findUnique({ where: { id } });
    if (!user) throw new HttpException(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
    return user as IUser;
  }

  public async create(newUser: IUser): Promise<Omit<User, 'password' | 'tasks' | 'updatedAt'>> {
    const allUsers = await this.getAll();
    if (allUsers.some((user) => user.email === newUser.email)) {
      throw new HttpException(StatusCodes.CONFLICT, 'Email já cadastrado');
    }

    const jsonTasks = JSON.stringify(seedPostLoginSchema);

    const salt = bcrypt.genSaltSync(5);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    const user = await this.model.create({
      select: { id: true, name: true, email: true, createdAt: true },
      data: {...newUser, tasks: jsonTasks },
    });
    if (!user) throw new HttpException(StatusCodes.BAD_REQUEST, 'Usuário não foi criado');
    return user;
  }

  public async update(id: number, updatedUser: IUser): Promise<Omit<User, 'name' | 'password' | 'tasks' | 'createdAt'>> {
    const user = await this.getById(id);
    const alreadyEncrypted = bcrypt.compare(user.password, updatedUser.password);
    if (!alreadyEncrypted) throw new HttpException(StatusCodes.BAD_REQUEST, 'Senha não pode ser igual a anterior');
    if (user.email === updatedUser.email) throw new HttpException(StatusCodes.BAD_REQUEST, 'Email não pode ser igual a anterior');
    if (!updatedUser.password) throw new HttpException(StatusCodes.BAD_REQUEST, 'Senha não pode ser vazia');
    
    const salt = bcrypt.genSaltSync(5);
    updatedUser.password = bcrypt.hashSync(updatedUser.password, salt);
    const userUpdate = await this.model.update({
      select: { id: true, email: true, updatedAt: true },
      where: { id },
      data: {...updatedUser, tasks: '' },
    });
    return userUpdate;
  }

  public async delete(id: number): Promise<Omit<User, 'password' | 'tasks' | 'updatedAt' |'createdAt'>> {
    const user = await this.model.delete({
      select: { id: true, email: true, name: true },
      where: { id },
    });
    return user;
  }
}
