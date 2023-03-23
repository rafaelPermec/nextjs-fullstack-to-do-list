import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import StatusCodes from 'http-status-codes';
import { HttpException } from '../Utils';

export default class TodoView {
  readonly model = prisma.user;

  public async getById(id: number): Promise<{ tasks: Prisma.JsonValue }> {
    const todos = await this.model.findUnique({
      select: { tasks: true }, 
      where: { id } 
    });
    if (!todos) throw new HttpException(StatusCodes.NOT_FOUND, 'Nenhuma tarefa encontrada');
    return todos;
  }

  public async update(id: number, todoList: Prisma.JsonValue): Promise<{ tasks: Prisma.JsonValue, updatedAt: Date }> {
    if (!todoList) throw new HttpException(StatusCodes.BAD_REQUEST, 'Lista de tarefas inválida');
    const newTodo = await this.model.update({
      select: { tasks: true, updatedAt: true },
      where: { id },
      data: {
        tasks: todoList,
      },
    });
    if (!newTodo) throw new HttpException(StatusCodes.BAD_REQUEST, 'Tarefas não foram atualizadas');
    return newTodo;
  }
}
