import { Request, Response } from "express";
import AuthBaseController from "./auth.base.controller";
import { EUserRole } from "../../../database/interfaces/enums";

class AuthController extends AuthBaseController {
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.authService.login(email, password, [
      EUserRole.admin,
      EUserRole.subAdmin,
    ]);
    return res.status(response.code).json(response);
  };
}

export default AuthController;
