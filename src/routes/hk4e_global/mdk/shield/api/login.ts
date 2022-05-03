import http from 'http';
import https from 'https';
import { db } from 'src';
import { log } from 'src/dispatch';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            console.log(body);
            try{
                let data = JSON.parse(body);
                // let uid = data.data.uid;
                // let token = data.data.token;
                /*

                */
                log("user is trying to login")

                console.log(data.account)

                let account = await db.findAccountByName(data.account);
                res.writeHead(200, { 'Content-Type': 'application/json' })

                if(account){
                    console.log(data)
                    var responseData = new LoginResultJson();
    
                    //todo change this to accountid
                    responseData.message="OK";
                    responseData.retcode = 0;

                    //shrug
                    responseData.data.account.uid = account._id.toString();

                    //todo: generate new one
                    responseData.data.account.token = "iX83IUoKqll8uwaouASaleG6bJkCLXBk";
                    responseData.data.account.email = account.email||"lmfao@gmail.com";


                    res.write(JSON.stringify(responseData));
                    log(JSON.stringify(responseData));
                }else{
                    //account doesnt exist
                    var responseData = new LoginResultJson();
                    responseData.retcode = -201
                    responseData.message = "Username not found";
                    res.write(JSON.stringify(responseData));
                    log(JSON.stringify(responseData));
                }
                    


            }catch(e){
                console.log(e);
            }
            res.end();

        });

    }
}
class ComboTokenReqJson {
	public app_id?:number;
	public channel_id?:number;
	public data?: string;
	public device?: string;
	public sign?: string;
	public token?:LoginTokenData;

}
class LoginTokenData {
    public uid?:string;
    public token?:string;
    public guest?:boolean;
}
class LoginResultJson {
	public message?:string;
	public retcode?:number;
	public data = new VerifyData();

}

	
class VerifyData {
    public account = new VerifyAccountData();
    public device_grant_required = false;
    public realname_operation = "NONE";
    public realperson_required = false;
    public safe_mobile_required = false;
}

class VerifyAccountData {
    public uid?:string;
    public name = "";
    public email?:string;
    public mobile = "";
    public is_email_verify = "0";
    public realname = "";
    public identity_card = "";
    public token?:string;
    public safe_mobile = "";
    public facebook_name = "";
    public twitter_name = "";
    public game_center_name = "";
    public google_name = "";
    public apple_name = "";
    public sony_name = "";
    public tap_name = "";
    public country = "US";
    public reactivate_ticket = "";
    public area_code = "**";
    public device_grant_ticket = "";
}
