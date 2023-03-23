import { TodoDTO } from "../DTOS/todo.dto";
import { v4 as uuid } from "uuid";

export default function todoFactory (todos: string[], userId: number): TodoDTO[] {
  const mappedTodos = todos.map((todo) => {
    return {
      id: uuid().substring(0, 8),
      text: todo,
      completed: false,
      ownerId: userId,
    };
  });
  return mappedTodos;
}
