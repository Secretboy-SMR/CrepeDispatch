import * as http from 'http';
import * as https from 'https';
import { db } from '../../../../../../src/index';
import { log } from '../../../../../../src/dispatch';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {

            try{
                let data = JSON.parse(body);
                // let uid = data.data.uid;
                // let token = data.data.token;
                /*

                {
                    "account": "da",
                    "password": "Eb2ZTMA0++3WzzMSSiNg2Udyy7qmsP1tONVG2HbePWm3Tex5Es2U8BaXs1yURROhfJERS1eTs7d6JSCS0LuuBkqSqTXlRaWuQqKE73S+Fe+3o66/6yg/JrorPdW/iGM3jiRcBUY1kFsvA1a2o7NNX70m+NdU9qQnue2E1rTPUJ4=",
                    "is_crypto": true
                }

                */
                log("user is trying to login")

                console.log(data)

                let acc = await db.findAccountByName(data.account);
                res.writeHead(200, { 'Content-Type': 'application/json' })

                if(acc){
                    console.log(acc)
                    var responseData = new LoginResultJson();
    
                    //todo change this to accountid
                    responseData.message="OK";
                    responseData.retcode = 0;

                    //shrug
                    responseData.retcode = 0;
                    responseData.message = "OK";
                    responseData.data.account.name = acc.Username || ""
                    responseData.data.account.mobile = acc.Username || ""
                    responseData.data.account.facebook_name = acc.Username || ""
                    responseData.data.account.google_name = acc.Username || ""
                    responseData.data.account.twitter_name = acc.Username || ""
                    responseData.data.account.steam_name = acc.Username || ""
                    responseData.data.account.apple_name = acc.Username || ""
                    responseData.data.account.sony_name = acc.Username || ""
                    responseData.data.account.tap_name = acc.Username || ""

                    
                    responseData.data.account.uid = acc.AccountID;
                    responseData.data.account.token = db.generateNewToken();;
                    responseData.data.account.email = acc.Email
                    res.write(JSON.stringify(responseData));


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
    public realname_operation = "None";
    public realperson_required = false;
    public safe_mobile_required = false;
}

class VerifyAccountData {
    public uid?:string|number;
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
    public area_code = "NB";
    public steam_name = "";
    public device_grant_ticket = "";
}

