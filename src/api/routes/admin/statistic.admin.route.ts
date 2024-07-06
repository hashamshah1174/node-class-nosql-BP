import { Validation } from "../../../middleware/validation.middleware";
import StatisticController from "../../controller/statistic/statistic.admin.controller";

import BaseRoutes from "../base.route";

class StatisticRoutes extends BaseRoutes {
  private statisticController: StatisticController;

  private validateRequest;

  constructor() {
    super();
    this.statisticController = new StatisticController();
    this.validateRequest = new Validation().reporter(true, "statistic");
    this.initializeRoutes();
  }
  protected routes(): void {
    this.router.get(
      "/donor",
      this.validateRequest,
      this.statisticController.sortByDonor
    );
    this.router.get(
      "/appeal",
      this.validateRequest,
      this.statisticController.sortByAppeal
    );
  }
}

export default StatisticRoutes;
