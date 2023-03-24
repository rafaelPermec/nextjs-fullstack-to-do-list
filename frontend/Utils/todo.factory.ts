import { TodoResponseDTO } from "../DTOS/todo.dto";
import { v4 as uuid } from "uuid";

export default function todoFactory (task: string, userId: number): TodoResponseDTO {
  return {
      id: uuid().substring(0, 8),
      text: task,
      completed: false,
      ownerId: userId,
    }
}
