import { User } from "../../database/models/user.model";
import { IUser } from "../../database/interfaces/user.interface";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}
