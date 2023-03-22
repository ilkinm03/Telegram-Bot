import { IUser, UserModel } from "../models/user.model";

class UserRepository {
  async create(body: IUser) {
    return await UserModel.create(body);
  }

  async get(query?: Partial<IUser>) {
    return await UserModel.find(query);
  }
}

export default new UserRepository();