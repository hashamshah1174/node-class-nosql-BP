import { Sequelize } from "sequelize-typescript";
import {
  POSTGRESQL_DATABASE,
  POSTGRESQL_HOST,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_PORT,
  POSTGRESQL_SSLMODE,
  POSTGRESQL_USERNAME,
} from "./environment.config";
import { User } from "../database/models/user.model";
import { Token } from "../database/models/token.model";
import { Appeal } from "../database/models/appeal.model";
import { Donation } from "../database/models/donation.model";

export class Database {
  protected sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: POSTGRESQL_DATABASE!,
      username: POSTGRESQL_USERNAME!,
      password: POSTGRESQL_PASSWORD!,
      host: POSTGRESQL_HOST!,
      port: Number(POSTGRESQL_PORT!), // Default PostgreSQL port

      dialect: "postgres",
      dialectOptions:
        POSTGRESQL_SSLMODE === "true"
          ? {
              ssl: {
                require: true, // Enable SSL connection
                rejectUnauthorized: false, // Allow self-signed certificates
              },
            }
          : {},
      models: [User, Token, Appeal, Donation],
    });
    this.connectDb();
  }
  private async dropTables() {
    try {
      // Execute raw SQL queries to drop each table
      await this.sequelize.query('DROP TABLE IF EXISTS "tokens" CASCADE');
      await this.sequelize.query('DROP TABLE IF EXISTS "donations" CASCADE');
      await this.sequelize.query('DROP TABLE IF EXISTS "appeals" CASCADE');
      await this.sequelize.query('DROP TABLE IF EXISTS "users" CASCADE');
      console.log("Tables dropped successfully!");
    } catch (error) {
      console.error("Error dropping tables:", error);
    }
  }

  private async connectDb(): Promise<void> {
    try {
      await this.sequelize.authenticate();

      await this.sequelize.sync(); // This will synchronize all defined models with the database
      console.log(
        "Connection to the database has been established successfully."
      );
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
