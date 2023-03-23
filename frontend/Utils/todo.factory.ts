import { TodoDTO } from "../DTOS/todo.dto";

export default function todoFactory (todos: string[], username: string): TodoDTO[] {
  const mappedTodos = todos.map((todo, index) => {
    return {
      id: index + 1,
      text: todo,
      completed: false,
      owner: username,
    };
  });
  return mappedTodos;
}
