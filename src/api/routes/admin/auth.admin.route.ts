import { Validation } from "../../../middleware/validation.middleware";
import AuthController from "../../controller/auth/auth.admin.controller";
import BaseRoutes from "../base.route";
import AppealRoutes from "./appeal.admin.route";
import DonationRoutes from "./donation.admin.route";
import StatisticRoutes from "./statistic.admin.route";
import UserRoutes from "./user.admin.route";

class AuthRoutes extends BaseRoutes {
  private authController: AuthController;

  private userRoute: UserRoutes;
  private appealRoute: AppealRoutes;
  private donationRoute: DonationRoutes;
  private statisticRoute: StatisticRoutes;

  private validateRequest;

  constructor() {
    super();
    this.authController = new AuthController();
    this.userRoute = new UserRoutes();
    this.appealRoute = new AppealRoutes();
    this.donationRoute = new DonationRoutes();
    this.statisticRoute = new StatisticRoutes();
    this.validateRequest = new Validation().reporter(true, "auth");
    this.initializeRoutes();
  }
  protected routes(): void {
    this.router.post(
      "/logout",
      this.validateRequest,
      this.authController.logout
    );

    this.router.post(
      "/update-detail",
      this.validateRequest,
      this.authController.updateData
    );
    this.router.post(
      "/update-password",
      this.validateRequest,
      this.authController.updateData
    );
    this.router.use("/user", this.userRoute.router);
    this.router.use("/appeal", this.appealRoute.router);
    this.router.use("/donation", this.donationRoute.router);
    this.router.use("/statistic", this.statisticRoute.router);
  }
}

export default AuthRoutes;
