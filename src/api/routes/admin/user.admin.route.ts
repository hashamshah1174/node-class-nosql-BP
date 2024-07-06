import { Validation } from "../../../middleware/validation.middleware";
import UserController from "../../controller/user/user.admin.controller";

import BaseRoutes from "../base.route";

class UserRoutes extends BaseRoutes {
  private userController: UserController;

  private validateRequest;

  constructor() {
    super();
    this.userController = new UserController();
    this.validateRequest = new Validation().reporter(true, "user");
    this.initializeRoutes();
  }
  protected routes(): void {
    this.router.post(
      "/create-staff",
      this.validateRequest,
      this.userController.create
    );
        this.router.post(
      "/create",
      this.validateRequest,
      this.userController.create
    );
    this.router.get("/list", this.validateRequest, this.userController.list);
    this.router.get("/index", this.validateRequest, this.userController.index);
    this.router.get(
      "/trash-index",
      this.validateRequest,
      this.userController.trashIndex
    );
    this.router.get(
      "/show/:id",
      this.validateRequest,
      this.userController.show
    );
    this.router.patch(
      "/update-staff/:id",
      this.validateRequest,
      this.userController.update
    );
    this.router.patch(
      "/change-password/:id",
      this.validateRequest,
      this.userController.update
    );
    this.router.patch(
      "/trash/:id",
      this.validateRequest,
      this.userController.trash
    );

    this.router.patch(
      "/restore/:id",
      this.validateRequest,
      this.userController.restore
    );

    this.router.delete(
      "/destroy/:id",
      this.validateRequest,
      this.userController.destroy
    );
  }
}

export default UserRoutes;
