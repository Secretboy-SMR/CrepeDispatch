import http from 'http';
import https from 'https';
import { db } from '../../../../../../../src/index';
import { log } from '../../../../../../../src/dispatch';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {

            try{
                let data = JSON.parse(body);
                /*
                {
                data: '{"uid":"21345","guest":false,"token":"iX83IUoKqll8uwaouASaleG6bJkCLXBk"}',
                app_id: '4',
                channel_id: '1',
                device: '713977b788390d5de26ca59257d75d229ebc49661651355595437',
                sign: '39851c65d827aa2fd27509720aad3122253a303cb891d4e78a5d34072dee1601'
                }

                {
                    "retcode": 0,
                    "message": "OK",
                    "data": {
                        "combo_id": "89858023",
                        "open_id": "129399082",
                        "combo_token": "580729acc024f02927c94ab18a88bf171c40e0fc",
                        "data": "{\"guest\":false}",
                        "heartbeat": false,
                        "account_type": 1
                    }
                }
                
                */
                console.log(data)
                res.writeHead(200, { 'Content-Type': 'application/json' })

                let inuid:string = JSON.parse(data.data).uid

                var responseData = new ComboTokenResJson();
                let acc = await db.findAccountById(inuid)
                if(acc){
                    responseData.retcode = 0;
                    responseData.message = "OK";
                    responseData.data.combo_id = "129399082"
                    responseData.data.combo_token = db.generateNewToken();
                    responseData.data.open_id = inuid.toString()
                    res.write(JSON.stringify(
                        responseData
                    ));
                    console.log(JSON.parse(JSON.stringify(responseData)))
                }else{
                    responseData.retcode = -201
                    responseData.message = "bad uid";
                    res.write(JSON.stringify(responseData));
                }
                //todo change this to accountid

                
            }catch(e){
                console.log(e);
                var responseData = new ComboTokenResJson();
                responseData.retcode = -201
                responseData.message = "bad data";
                

                res.write(JSON.stringify(responseData));
            }
            res.end();

        });

    }
}


class ComboTokenResJson {
	public message?:string;
	public retcode?:number;
	public data:LoginData = new LoginData();
	

}

class LoginData {
    public account_type?:number = 1;
    public heartbeat?:string;
    public combo_id?:string;
    public combo_token?:string;
    public open_id?:string;
    public data?:string = "{\"guest\":false}";
    public fatigue_remind?:string = undefined; // ?
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
