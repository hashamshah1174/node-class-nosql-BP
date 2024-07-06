import { EUserRole } from "../interfaces/enums";
import { User } from "../models/user.model";
import { Database } from "../../config/database.config";

new Database(); //connect database

User.findOne({ where: { role: EUserRole.admin } }).then((admin) => {
  if (!admin) {
    try {
      const createdAdmin = User.create({
        uniqueId: "MAIC-100", // Provide a unique identifier
        role: EUserRole.admin,
        firstName: "dummy",
        lastName: "dummy",
        email: "admin@muntada.aid",
        phoneNumber: "+442071180777",
        password: "123456",
      });
      console.log(`${createdAdmin} admin user created`);
    } catch (error) {
      console.error("Error creating admin user:", error);
    }
  } else {
    console.log("Admin user already exists:", admin.id);
  }
});
