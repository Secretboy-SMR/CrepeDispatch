import Dispatch from "./dispatch";
import * as readline from "readline";
import DBService from "./dbservice";

export var std = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


export var dispatch:Dispatch; 
export var db :DBService;


const start= async()=>{
    dispatch = new Dispatch(80, 443);
    db =  new DBService("mongodb://localhost:27017", "Crepe")
    await db.connectToDatabase();
    //dispatch can use some db functions so better wait for db to initalize
    dispatch.start();

    checkContinue();



    // db.test()
}
start();
async function checkContinue(){
    std.question("", (answer) => {
        if(answer === "exit"){
            dispatch.stop();
            std.write("exiting...\n");
            process.exit();
        }else{
            
            checkContinue()
        }
    });
}
