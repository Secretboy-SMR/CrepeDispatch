import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            console.log(body);
            try{
                let data = JSON.parse(body);
                // let uid = data.data.uid;
                // let token = data.data.token;
                /*
                {
                    data: '{"uid":"1","guest":false,"token":"iX83IUoKqll8uwaouASaleG6bJkCLXBk"}',
                    app_id: '4',
                    channel_id: '1',
                    device: '713977b788390d5de26ca59257d75d229ebc49661634257199132',
                    sign: '75f51c2166962b423d1cff70dc3f3c6a4343e397b1d4b92c2c8c3b779ce2daaa'
                }
                */

                res.writeHead(200, { 'Content-Type': 'application/json' })
                    
                console.log(data)
                var responseData = new LoginResultJson();

                //todo change this to accountid
                responseData.message="OK";
                responseData.retcode = 0;
                responseData.data.account.uid = "1";
                responseData.data.account.token = "iX83IUoKqll8uwaouASaleG6bJkCLXBk";
                responseData.data.account.email = "lmfao@gmail.com";
                res.write(JSON.stringify(responseData));
                console.log(JSON.stringify(responseData));

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
