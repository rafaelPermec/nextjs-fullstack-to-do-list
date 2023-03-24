import { Prisma } from "@prisma/client";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  id?: number;
  name: string;
  tasks: Prisma.JsonValue;
}

export interface IUserAuth extends IUser {
  token: string;
  auth: boolean;
}
