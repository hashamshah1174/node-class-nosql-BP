import { EUserRole } from "../../database/interfaces/enums";
import { Request } from "express";
import { IUser } from "../../database/interfaces/user.interface";

import { ResponseHelper } from "../helpers/reponseapi.helper";
import TokenService from "./token.service";

import {
  ERROR_LOGIN,
  ERROR_OLD_PASSWORD,
  SUCCESS_DATA_UPDATION_PASSED,
  SUCCESS_LOGIN_PASSED,
  SUCCESS_LOGOUT_PASS,
  SUCCESS_NEW_TOKEN_PASSED,
  SUCCESS_REGISTRATION_PASSED,
} from "../../constant";
import { compare } from "bcrypt";
import { UserRepository } from "../repository/user.repository";
import { Op } from "sequelize";

class AuthService {
  private tokenService: TokenService;
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.tokenService = new TokenService();
  }

  myDetail = async (userId: number): Promise<IUser | null> => {
    return await this.userRepository.getById(userId);
  };
  validateEmail = async (email: string): Promise<Boolean> => {
    const response = await this.userRepository.getOne({
      where: {
        email: email,
      },
    });
    return response ? true : false;
  };

  register = async (req: Request, role: EUserRole): Promise<ApiResponse> => {
    try {
      if (req.body.confirmPassword) {
        delete req.body.confirmPassword;
      }
      const user: IUser = {
        ...req.body,
        role: role,
      };
      const data = await this.userRepository.create(user);
      const userId = data.id!;
      const tokenResponse = await this.tokenService.create(userId, data.role);

      return ResponseHelper.sendSignTokenResponse(
        201,
        SUCCESS_REGISTRATION_PASSED,
        data,
        tokenResponse
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  };
  login = async (
    email: string,
    password: string,
    roles: EUserRole[]
  ): Promise<ApiResponse> => {
    try {
      let response = await this.userRepository.getOne({
        where: {
          email: email,
          role: {
            [Op.in]: roles,
          },
        },
      });
      if (
        response === null ||
        (response && !(await compare(password, response.password!)))
      ) {
        return ResponseHelper.sendResponse(401, ERROR_LOGIN);
      }

      const { id, role } = response;

      const tokenResponse = await this.tokenService.create(id!, role);

      return ResponseHelper.sendSignTokenResponse(
        200,
        SUCCESS_LOGIN_PASSED,
        response,
        tokenResponse
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  };

  getAccessToken = async (refreshToken: string): Promise<ApiResponse> => {
    try {
      const response = await this.tokenService.validateToken(
        undefined,
        undefined,
        refreshToken
      );
      if (response === null) {
        return ResponseHelper.sendResponse(404);
      }
      const resp = await this.tokenService.setNewToken(
        response.id!,
        response.userId,
        response.role,
        refreshToken
      );
      return ResponseHelper.sendSuccessResponse(SUCCESS_NEW_TOKEN_PASSED, resp);
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  };

  logout = async (
    userId: number,
    refreshToken: string
  ): Promise<ApiResponse> => {
    try {
      await this.tokenService.loggedOut(userId, refreshToken);
      return ResponseHelper.sendSuccessResponse(SUCCESS_LOGOUT_PASS);
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  };

  updateData = async (
    userId: number,
    req: Request,
    oldPassword?: string
  ): Promise<ApiResponse> => {
    let path = undefined;
    try {
      const response = await this.userRepository.getOne({
        where: {
          id: userId,
        },
      });
      if (oldPassword) {
        if (
          response === null ||
          (response && !(await compare(oldPassword, response.password!)))
        ) {
          return ResponseHelper.sendResponse(404, ERROR_OLD_PASSWORD);
        }
      }

      const data: Partial<IUser> = { ...req.body };

      const resp = await this.userRepository.updateById(userId, data);
      if (resp === null) {
        return ResponseHelper.sendResponse(404);
      }

      return ResponseHelper.sendSuccessResponse(
        SUCCESS_DATA_UPDATION_PASSED,
        resp
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  };
}

export default AuthService;
