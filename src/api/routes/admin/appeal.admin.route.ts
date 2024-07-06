import { Validation } from "../../../middleware/validation.middleware";
import AppealController from "../../controller/appeal/appeal.admin.controller";

import BaseRoutes from "../base.route";

class AppealRoutes extends BaseRoutes {
  private appealController: AppealController;

  private validateRequest;

  constructor() {
    super();
    this.appealController = new AppealController();
    this.validateRequest = new Validation().reporter(true, "appeal");
    this.initializeRoutes();
  }
  protected routes(): void {
    this.router.get(
      "/index",
      this.validateRequest,
      this.appealController.index
    );
  }
}

export default AppealRoutes;
