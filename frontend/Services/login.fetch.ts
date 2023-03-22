import axios from "axios";
import { LoginDTO } from "../DTOS/login.dto";

const { ACTUAL_URL } = process.env;

const loginFetch = async (data: LoginDTO) => {
  const user = await axios({
    method: "POST",
    url: `${ACTUAL_URL}/login`,
    data,
  })
  return user;
}

const authFetch = async (data: LoginDTO) => {
  const user = await axios({
    method: "GET",
    url: `${ACTUAL_URL}/login`,
    data,
  })
  return user;
}

export { loginFetch, authFetch };
