import { Moment } from "moment";
import { EUserRole } from "./enums";

export interface IToken extends JwtToken {
  id?: number;
  userId: number;
  role: EUserRole;
  createdAt?: Date | Moment;
  updatedAt?: Date | Moment;
}
