// import * as bcrypt from 'bcryptjs';
// import { generateJWTToken, HttpException } from '../Utils';
// import UserModel from '../Models/user.model';
// import { IUser, IUserLogin } from '../DTOS/user.dto';

// export default class UserService {
//   public model: UserModel;

//   private async create(newUser: User): Promise<any> {
//     const user = await this.model.({
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

//   private async login(login: IUserLogin): Promise<string> {
//     const errorMessage = 'Incorrect email or password';
//     if (!login.email || !login.password) throw new HttpException(400, 'Todos os campos devem estar preenchidos');

//     const allClients: IUser[] = await this.getAll();

//     const clientData = allClients.filter((element) => element.email === (login.email));
//     if (clientData.length === 0) throw new HttpException(401, errorMessage);

//     const isMatch = bcrypt.compare(login.password, clientData[0].password as string);
//     if (!isMatch) throw new HttpException(401, errorMessage);

//     const token = generateJWTToken({
//       id: clientData[0].id,
//       email: clientData[0].email,
//       role: clientData[0].role,
//       username: clientData[0].username,
//     });

//     return token;
//   }
// }