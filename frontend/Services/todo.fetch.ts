import axios from "axios";
import { parseCookies } from "nookies";


const todoFetch = async (id: number) => {
  const { 'auth': auth } = parseCookies();
  const todo = await axios({
    method: "GET",
    url: `/api/v1/todo-list/${id}`,
    headers: {
      'Authorization': auth,
    },
  })
  return todo;
}

const patchTodoFetch = async (id: number, data: { tasks: string }) => {
  const { 'auth': auth } = parseCookies();
  const todo = await axios({
    method: "PATCH",
    url: `/api/v1/todo-list/${id}`,
    headers: {
      'Authorization': auth,
    },
    data: data,
  })
  return todo;
}

export { todoFetch, patchTodoFetch };
