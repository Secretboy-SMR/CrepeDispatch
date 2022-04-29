import Dispatch from "./dispatch";
import * as readline from "readline";
import DBService from "./dbservice";

export var std = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dispatch = new Dispatch(80, 443);

checkContinue()
const db = new DBService("mongodb://localhost:27017", "Crepe")

dispatch.start();


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
