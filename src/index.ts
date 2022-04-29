import Dispatch from "./dispatch";
import * as readline from "readline";

export var std = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dispatch = new Dispatch(80, 443);

checkContinue()

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
