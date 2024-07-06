import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { APP_HOST, APP_MODE, APP_PORT } from "./config/environment.config";
import { Database } from "./config/database.config";

import { SwaggerConfig } from "./config/swagger.config";
import path from "path";
import session from "express-session";
import AdminRoutes from "./api/routes/admin/admin.route";

class App {
  protected app: Application;
  protected database: Database;
  protected swagger: SwaggerConfig;
  protected adminRoutes: AdminRoutes;
  protected viewPath: string;

  constructor() {
    this.app = express();
    this.viewPath = path.join(__dirname, "views");
    this.adminRoutes = new AdminRoutes();
    this.config();
    this.database = new Database();
    this.swagger = new SwaggerConfig(this.app);
  }

  private config(): void {
    this.app.use(
      session({
        secret: "mysecret", // Replace with your own secret key
        resave: false,
        saveUninitialized: true,
      })
    );
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.set("view engine", "ejs");
    this.app.set("views", this.viewPath);
    this.app.use("/api/v1/admin", this.adminRoutes.router);
  }
  public start(): void {
    const appPort = Number(APP_PORT);
    this.app.listen(appPort, APP_HOST!, () => {
      console.log(`Server running at http://${APP_HOST}:${appPort}/`);
    });
  }
}

const app = new App();
app.start();
