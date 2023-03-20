import { prisma } from '@/lib/prisma';
import StatusCodes from 'http-status-codes';
import { HttpException } from '../Utils';

export default class TodoModel {
  readonly model = prisma.user;

  public async getById(id: number): Promise<{ todos: string[] }> {
    const todos = await this.model.findUnique({
      select: { todos: true }, 
      where: { id } 
    });
    if (!todos) throw new HttpException(StatusCodes.NOT_FOUND, 'Nenhuma tarefa encontrada');
    return todos as { todos: string[] };
  }

  public async update(id: number, todoList: string[]): Promise<{ todos: string[], updatedAt: Date }> {
    const newTodo = await this.model.update({
      select: { todos: true, updatedAt: true },
      where: { id },
      data: {
        todos: todoList,
      },
    });
    return newTodo;
  }
}
