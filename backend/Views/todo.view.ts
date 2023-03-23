import { prisma } from '@/lib/prisma';
import StatusCodes from 'http-status-codes';
import { HttpException } from '../Utils';

export default class TodoView {
  readonly model = prisma.user;

  public async getById(id: number): Promise<{ todos: any }> {
    const todos = await this.model.findUnique({
      select: { todos: true }, 
      where: { id } 
    });
    if (!todos) throw new HttpException(StatusCodes.NOT_FOUND, 'Nenhuma tarefa encontrada');
    return todos as { todos: any };
  }

  public async update(id: number, todoList: any): Promise<{ todos: any, updatedAt: Date }> {
    if (!todoList) throw new HttpException(StatusCodes.BAD_REQUEST, 'Lista de tarefas inválida');
    const newTodo = await this.model.update({
      select: { todos: true, updatedAt: true },
      where: { id },
      data: {
        todos: todoList,
      },
    });
    if (!newTodo) throw new HttpException(StatusCodes.BAD_REQUEST, 'Tarefas não foram atualizadas');
    return newTodo;
  }
}
