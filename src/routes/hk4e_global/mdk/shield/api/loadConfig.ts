import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        req.on("end", ()=>{
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(`{"retcode":0,"message":"OK","data":{"id":6,"game_key":"hk4e_global","client":"PC","identity":"I_IDENTITY","guest":false,"ignore_versions":"","scene":"S_NORMAL","name":"原神海外","disable_regist":false,"enable_email_captcha":false,"thirdparty":["fb","tw"],"disable_mmt":false,"server_guest":false,"thirdparty_ignore":{"tw":"","fb":""},"enable_ps_bind_account":false,"thirdparty_login_configs":{"tw":{"token_type":"TK_GAME_TOKEN","game_token_expires_in":604800},"fb":{"token_type":"TK_GAME_TOKEN","game_token_expires_in":604800}}}}`);

            res.end();

        })
    }
}