import axios from "axios"
import { LoginDTO, RegisterDTO } from "../DTOS/login.frontend.dto";
import { parseCookies } from "nookies";


const createUserFetch = async (data: RegisterDTO) => {
  const createdUser = await axios.post(`/api/v1/users`, data);
  return createdUser;
}

const getUserFetch = (id: number, data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const user = axios({
    method: "GET",
    url: `/api/v1/users/${id}`,
    headers: {
      'Authorization': auth,
    },
    data,
  })
  return user;
}

const patchUserFetch = (id: number, data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const user = axios({
    method: "PATCH",
    url: `/api/v1/users/${id}`,
    headers: {
      'Authorization': auth,
    },
    data,
  })
  return user;
}

const deleteUser = (id: number, data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const user = axios({
    method: "DELETE",
    url: `/api/v1/users/${id}`,
    headers: {
      'Authorization': auth,
    },
    data,
  })
  return user;
}

export { createUserFetch, getUserFetch, patchUserFetch, deleteUser };
