import axios from "axios";
import { TodoDTO } from "../DTOS/todo.dto";

const { ACTUAL_URL } = process.env;

const todoFetch = async (id: number, data: TodoDTO) => {
  const todo = await axios({
    method: "GET",
    url: `${ACTUAL_URL}/todo-list/${id}`,
    data,
  })
  return todo;
}

const patchTodoFetch = async (data: TodoDTO) => {
  const todo = await axios({
    method: "PATCH",
    url: `${ACTUAL_URL}/todo-list`,
    data,
  })
  return todo;
}

export { todoFetch, patchTodoFetch };
