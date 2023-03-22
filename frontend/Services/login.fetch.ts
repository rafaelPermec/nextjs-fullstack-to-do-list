import axios from "axios";
import { LoginDTO } from "../DTOS/login.dto";
import { parseCookies } from "nookies";

const loginFetch = async (data: LoginDTO) => {
  const user = await axios({
    method: "POST",
    url: `http://localhost:3000/api/v1/login`,
    data,
  })

  return user;
}

const authFetch = async (data: LoginDTO) => {
  const { 'auth': auth } = parseCookies();
  const authHeader = JSON.parse(auth).token;
  const user = await axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/login`,
    headers: {
      'Authorization': authHeader.token,
    },
    data,
  })
  return user;
}

export { loginFetch, authFetch };
