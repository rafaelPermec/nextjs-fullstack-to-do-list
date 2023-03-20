import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { IUser } from '../DTOS/user.dto';

export default class TodoModel {
  private model = prisma.user;

  public async getById(id: number): Promise<IUser> {
    const user = await this.model.findUnique({ where: { id } });
    return user as IUser;
  }

  public async update(id: number, todoList: string[]): Promise<Omit<User, 'id' | 'password' | 'email' | 'createdAt'>> {
    const user = await this.model.update({
      select: { name: true, todos: true, updatedAt: true },
      where: { id },
      data: { todos: todoList },
    });
    return user;
  }
}
