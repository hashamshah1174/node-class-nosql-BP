import { Database } from "../../config/database.config";

class TestFunction {


  constructor() {
    new Database();

  }

  caseRun = ()=>{
    console.log("cas run");
  }
}

new TestFunction().caseRun();
