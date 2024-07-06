import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { EUserRole } from "../interfaces/enums";
import { IToken } from "../interfaces/token.interface";

import { User } from "./user.model";
import { IUser } from "../interfaces/user.interface";

@Table({ tableName: "tokens", timestamps: true })
export class Token extends Model<IToken> implements IToken {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userId!: number;

  @BelongsTo(() => User, "userId")
  user!: IUser | null;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(EUserRole)),
  })
  role!: EUserRole;

  @Column({ allowNull: false, type: DataType.STRING })
  accessToken!: string;

  @Column({ allowNull: false, type: DataType.STRING })
  refreshToken!: string;
}
