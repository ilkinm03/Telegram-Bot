import { IUser, UserModel } from "../models/user.model";

class UserRepository {
  async create(body: IUser) {
    return await UserModel.create(body);
  }

  async get(query?: Partial<IUser>) {
    return await UserModel.find(query);
  }

  async deactivate(email: string) {
    return await UserModel.findOneAndUpdate({ email }, {
      $set: {
        isActive: false,
      },
    });
  }
}

export default new UserRepository();