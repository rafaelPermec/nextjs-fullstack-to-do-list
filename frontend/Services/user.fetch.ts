import axios from "axios"
import { LoginDTO } from "../DTOS/login.dto";
import { parseCookies } from "nookies";


const createUserFetch = async (data: LoginDTO) => {
  const createdUser = await axios.post(`http://localhost:3000/api/v1/users`, data);
  return createdUser;
}

const getUserFetch = (id: number, data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const authHeader = JSON.parse(auth).token;
  const user = axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/users/${id}`,
    headers: {
      'Authorization': authHeader,
    },
    data,
  })
  return user;
}

const patchUserFetch = (id: number, data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const authHeader = JSON.parse(auth).token;
  const user = axios({
    method: "PATCH",
    url: `http://localhost:3000/api/v1/users/${id}`,
    headers: {
      'Authorization': authHeader,
    },
    data,
  })
  return user;
}

const deleteUser = (id: number, data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const authHeader = JSON.parse(auth).token;
  const user = axios({
    method: "DELETE",
    url: `http://localhost:3000/api/v1/users/${id}`,
    headers: {
      'Authorization': authHeader,
    },
    data,
  })
  return user;
}

export { createUserFetch, getUserFetch, patchUserFetch, deleteUser };
