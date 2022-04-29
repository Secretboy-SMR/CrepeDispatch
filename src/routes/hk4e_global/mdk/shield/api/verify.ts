import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        let body = ""
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            console.log(body);
            try{
                //{ uid: '1', token: 'iX83IUoKqll8uwaouASaleG6bJkCLXBk' }
                let data = JSON.parse(body);
                let uid = data.uid;
                let token = data.token;

                console.log(data)
                var responseData = new LoginResultJson();
                responseData.message = "OK";
                responseData.data.account.uid = uid;
                responseData.data.account.token = token;
				responseData.data.account.email = "lmfao@gmail.com";
                res.write(JSON.stringify(responseData));
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
