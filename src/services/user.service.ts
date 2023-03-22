import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  async createUser(body: IUser) {
    return UserRepository.create(body);
  }

  async getUser(query?: Partial<IUser>) {
    return UserRepository.get(query);
  }
}

export default new UserService();