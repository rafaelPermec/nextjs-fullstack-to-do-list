import axios from "axios";
import { TodoDTO } from "../DTOS/todo.dto";
import { parseCookies } from "nookies";


const todoFetch = async (id: number, data: TodoDTO) => {
  const { 'auth': auth } = parseCookies();
  const authHeader = JSON.parse(auth).token;
  const todo = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/todo-list/${id}`,
    headers: {
      'Authorization': authHeader,
    },
    data,
  })
  return todo;
}

const patchTodoFetch = async (data: TodoDTO) => {
  const { 'auth': auth } = parseCookies();
  const authHeader = JSON.parse(auth).token;
  const todo = await axios({
    method: "PATCH",
    url: `http://localhost:3000/api/v1/todo-list`,
    headers: {
      'Authorization': authHeader,
    },
    data,
  })
  return todo;
}

export { todoFetch, patchTodoFetch };
