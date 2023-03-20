import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { IUser } from '../DTOS/user.dto';

export default class UserModel {
  private model = prisma.user;

  public async create(newUser: IUser): Promise<Omit<User, 'email' | 'password' | 'todos' | 'updatedAt'>> {
    const user = await this.model.create({
      select: { id: true, name: true, createdAt: true },
      data: newUser,
    });
    return user;
  }

  public async getById(id: number): Promise<IUser> {
    const user = await this.model.findUnique({ where: { id } });
    return user as IUser;
  }

  public async update(id: number, updatedUser: IUser): Promise<Omit<User, 'name' | 'password' | 'todos' | 'createdAt'>> {
    const user = await this.model.update({
      select: { id: true, email: true, updatedAt: true },
      where: { id },
      data: updatedUser,
    });
    return user;
  }

  public async delete(id: number): Promise<Omit<User, 'password' | 'todos' | 'updatedAt' |'createdAt'>> {
    const user = await this.model.delete({
      select: { id: true, email: true, name: true },
      where: { id },
    });
    return user;
  }
}
