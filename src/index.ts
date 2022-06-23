import { Db } from "typeorm";
import { AppDataSource } from "./data-source"
import DBService from "./dbservice";
import Dispatch from "./dispatch";
import { Accounts } from "./entity/Accounts"

const user = new Accounts();

let db:DBService = new DBService();

export {db};

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new Accounts();
    user.AccountID = 101010102;
    user.Email = "test@gmail.com";
    user.Password = "test";
    user.CountryCode = "ts";
    user.Token = "23232";
    user.Username = "testo?"


    // await AppDataSource.manager.save(user, {
        
    // })
    console.log("Saved a new user with id: " + user.AccountID)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Accounts)
    console.log("Loaded users: ", users)

    let a = new Dispatch(80,443);
    //db.test();
    a.start();

}).catch(error => console.log(error))
