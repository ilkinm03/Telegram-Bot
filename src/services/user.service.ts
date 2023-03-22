import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  async createUser(body: IUser) {
    return UserRepository.create(body);
  }
}

export default new UserService();