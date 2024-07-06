import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BeforeValidate,
  Sequelize,
} from "sequelize-typescript";
import { EUserRole } from "../interfaces/enums";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { Token } from "./token.model";

@Table({ tableName: "users", timestamps: true, paranoid: true })
export class User extends Model<IUser> implements IUser {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  uniqueId!: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  createdBy!: number;

  @BelongsTo(() => User, "createdBy")
  creator!: IUser | null;

  @HasMany(() => User, "createdBy")
  createdUsers!: IUser[];

  @HasMany(() => Token, "userId")
  tokens!: Token[];

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(EUserRole)),
  })
  role!: EUserRole;

  @Column({ allowNull: true, type: DataType.STRING })
  title!: string;

  @Column({ allowNull: true, type: DataType.STRING })
  firstName!: string;

  @Column({ allowNull: true, type: DataType.STRING })
  lastName!: string;

  @Column({ allowNull: true, type: DataType.STRING })
  email!: string;

  @Column({ allowNull: true, type: DataType.STRING })
  phoneNumber: string;

  @Column({ allowNull: true, type: DataType.STRING })
  telePhone: string;

  @Column({ allowNull: true, type: DataType.STRING })
  password: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  addressLineOne: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  addressLineTwo: string;

  @Column({ allowNull: true, type: DataType.STRING })
  town: string;

  @Column({ allowNull: true, type: DataType.STRING })
  county: string;

  @Column({ allowNull: true, type: DataType.STRING })
  country: string;

  @Column({ allowNull: true, type: DataType.STRING })
  postCode: string;

  @Column({ allowNull: true, type: DataType.STRING })
  fax: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  organization: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  jobTitle: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  officeNotes: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  message: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  emailSubscription: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  smsSubscription: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  postalSubscription: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  telephoneSubscription: boolean;

  @BeforeValidate
  static async generateUniqueIdAndHashPassword(user: User) {
    if (!user.uniqueId) {
      user.uniqueId = await User.generateUniqueId(User);
    }


    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password as string, salt);
      user.password = hashedPassword;
    }
  }

  toJSON() {
    const { password, ...data } = super.toJSON(); // Extract all fields except password
    return data;
  }

  static async generateUniqueId(UserModel: typeof User): Promise<string> {
    const lastRecord = await UserModel.findOne({
      order: [
        [Sequelize.cast(Sequelize.fn('regexp_replace', Sequelize.col('uniqueId'), '^[^0-9]+', ''), 'INTEGER'), 'DESC']
      ],
    });

    console.log("lastRecord",lastRecord)

    const userCount = lastRecord
      ? Number(lastRecord.uniqueId.split("-")[1])
      : 100;

    return `MAIC-${userCount + 1}`;
  }
  async comparePassword(password: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(password, this.password);
  }
}
