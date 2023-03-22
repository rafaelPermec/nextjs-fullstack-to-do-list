import axios from "axios"
import { LoginDTO } from "../DTOS/login.dto"

const { ACTUAL_URL } = process.env;

const createUserFetch = async (data: LoginDTO) => {
  const createdUser = await axios({
    method: "POST",
    url: `${ACTUAL_URL}/users`,
    data,
  })
  return createdUser;
}

const getUserFetch = (id: number, data: LoginDTO) => {
  const user = axios({
    method: "GET",
    url: `${ACTUAL_URL}/users/${id}`,
    data,
  })
  return user;
}

const patchUserFetch = (id: number, data: LoginDTO) => {
  const user = axios({
    method: "PATCH",
    url: `${ACTUAL_URL}/users/${id}`,
    data,
  })
  return user;
}

const deleteUser = (id: number, data: LoginDTO) => {
  const user = axios({
    method: "DELETE",
    url: `${ACTUAL_URL}/users/${id}`,
    data,
  })
  return user;
}

export { createUserFetch, getUserFetch, patchUserFetch, deleteUser };
