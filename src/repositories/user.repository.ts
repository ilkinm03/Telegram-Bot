import { IUser, UserModel } from "../models/user.model";

class UserRepository {
  async create(body: IUser) {
    return await UserModel.create(body);
  }
}

export default new UserRepository();