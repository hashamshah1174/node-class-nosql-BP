import { Validation } from "../../../middleware/validation.middleware";
import DonationController from "../../controller/donation/donation.admin.controller";

import BaseRoutes from "../base.route";

class DonationRoutes extends BaseRoutes {
  private donationController: DonationController;

  private validateRequest;

  constructor() {
    super();
    this.donationController = new DonationController();
    this.validateRequest = new Validation().reporter(true, "donation");
    this.initializeRoutes();
  }
  protected routes(): void {
    this.router.get(
      "/index",
      this.validateRequest,
      this.donationController.index
    );
    this.router.get(
      "/trash-index",
      this.validateRequest,
      this.donationController.trashIndex
    );
    this.router.get(
      "/show/:id",
      this.validateRequest,
      this.donationController.show
    );

    this.router.patch(
      "/trash/:id",
      this.validateRequest,
      this.donationController.trash
    );

    this.router.patch(
      "/restore/:id",
      this.validateRequest,
      this.donationController.restore
    );

    this.router.delete(
      "/destroy/:id",
      this.validateRequest,
      this.donationController.destroy
    );
  }
}

export default DonationRoutes;
