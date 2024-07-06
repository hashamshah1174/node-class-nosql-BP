import phone from "phone";
import * as yup from "yup";
import * as jwt from "jsonwebtoken";

import { JWT_REFRESH_SECRET_KEY } from "../config/environment.config";
import { EUserRole } from "../database/interfaces/enums";

const getAccessTokenRule = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      refreshToken: yup
        .string()
        .required()
        .test(
          "inavlid_token",
          "No Such Refresh Token Exsit!",
          (value: string | undefined) => {
            if (!value) {
              return true;
            }
            return jwt.verify(
              value,
              JWT_REFRESH_SECRET_KEY!,
              function (err, decoded) {
                if (err || typeof decoded == "string") {
                  return false;
                }
                return true;
              }
            );
          }
        ),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

const loginRule = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().min(3).required(),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

const updateData = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      role: yup
        .number()
        .oneOf([...Object.values(EUserRole).map((value) => Number(value))])
        .notRequired(),
      email: yup.string().when("role", (st: any, schema: any) => {
        return st && st[0] === Number(EUserRole.admin)
          ? yup.string().email().required()
          : yup.string().notRequired().strip();
      }),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      emailAlert: yup.bool().notRequired().nullable(),
      inAppNotification: yup.bool().notRequired().nullable(),

      phoneNumber: yup
        .string()
        .nullable()
        .notRequired()
        .test(
          "invalid_number",
          "No such Phone Number exists!",
          (value: string | undefined | null) => {
            if (typeof value !== "string") {
              return true;
            }
            return phone(value!, { validateMobilePrefix: true }).isValid;
          }
        ),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

const changePassword = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      password: yup.string().min(3).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

const updatePassword = yup.object().shape({
  params: yup.object().noUnknown(),
  body: yup
    .object()
    .shape({
      oldPassword: yup.string().min(3).required(),
      password: yup.string().min(3).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
    })
    .noUnknown(),
  query: yup.object().noUnknown(),
});

export = {
  "/login": loginRule,
  "/get-new-token": getAccessTokenRule,
  "/logout": getAccessTokenRule,
  "/update": updateData,

  "/change-password": changePassword,
  "/update-detail": updateData,
  "/update-password": updatePassword,
};
