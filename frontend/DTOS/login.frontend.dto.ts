export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends LoginDTO {
  name: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthDTO {
  id: number;
  name: string;
  email: string;
  token: string;
  auth: boolean;
}

export interface AuthContextDTO {
  isAuthenticated: boolean;
  isAuth: AuthDTO | undefined;
  serverSideLogin: (user: LoginDTO) => void;
}
