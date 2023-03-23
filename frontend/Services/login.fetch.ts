import axios from "axios";
import { LoginDTO } from "../DTOS/login.dto";
import { parseCookies } from "nookies";

const loginFetch = async (data: LoginDTO) => {
  const user = await axios({
    method: "POST",
    url: `/api/v1/login`,
    data,
  })

  return user;
}

const authFetch = async (data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const user = await axios({
    method: "GET",
    url: `/api/v1/login`,
    headers: {
      'Authorization': auth,
    },
    data,
  })
  return user;
}

export { loginFetch, authFetch };
