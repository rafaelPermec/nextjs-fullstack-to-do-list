// import * as bcrypt from 'bcryptjs';
// import { generateJWTToken, HttpException } from '../Utils';
// import { prisma } from '@/lib/prisma';
// import { User } from '@prisma/client';
// import { IUser, IUserLogin } from '../DTOS/user.dto';

// export default class UserModel {
//   private model = prisma.user;

//   constructor() {
//     this.model = new prisma(connection);
//   }

//   private async create(newUser: User): Promise<any> {
//     const user = await this.model.create({
//       select: {},
//       data: newUser,
//     });
//     return user;
//   }

//   private async getById(id: number): Promise<IUser> {
//     const user = await this.model.findUnique(id);
//     return user as IUser;
//   }

//   private async update(id: number): Promise<IUser> {
//     const user = await this.model.update(id);
//     return user as IUser;
//   }

//   private async delete(id: number): Promise<IUser> {
//     const user = await this.model.delete(id);
//     return user as IUser;
//   }
// }
