import { Moment } from "moment";

import { EUserRole } from "./enums";

export interface IUser {
  id?: number;
  uniqueId: string;
  createdBy: number | null;
  creator?: IUser | null; //belong to users
  createdUsers?: IUser[] | null; //has many users
  role: EUserRole;
  title?: string | null;
  firstName: string;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  telePhone: string | null;
  addressLineOne: string | null;
  addressLineTwo: string | null;
  town: string | null;
  county: string | null;
  country: string | null;
  postCode: string | null;
  organization: string | null;
  jobTitle: string | null;
  officeNotes: string | null;
  message: string | null;
  emailSubscription?: boolean;
  smsSubscription?: boolean;
  telephoneSubscription?: boolean;
  postalSubscription?: boolean;

  password: string | null;

  createdAt?: Date | Moment;
  updatedAt?: Date | Moment;
  deletedAt?: Date | Moment | null;
}
