import { TodoDTO } from "../DTOS/todo.dto";
import { v4 as uuid } from "uuid";

export default function todoFactory (todos: string[], username: string): TodoDTO[] {
  const mappedTodos = todos.map((todo) => {
    return {
      id: uuid().substring(0, 8),
      text: todo,
      completed: false,
      owner: username,
    };
  });
  return mappedTodos;
}
