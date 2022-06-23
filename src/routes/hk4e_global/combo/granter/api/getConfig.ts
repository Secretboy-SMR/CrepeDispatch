import * as http from 'http';
import * as https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.write(JSON.stringify({
            "retcode":0,
            "message":"OK",
            "data":{
                "protocol":true,
                "qr_enabled":false,
                "log_level":"INFO",
                "announce_url":"https://webstatic-sea.hoyoverse.com/hk4e/announcement/index.html?sdk_presentation_style=fullscreen&sdk_screen_transparent=true&game_biz=hk4e_global&auth_appid=announcement&game=hk4e#/",
                "push_alias_type":2,
                "disable_ysdk_guard":false,
                "enable_announce_pic_popup":true}
            })
        );
        res.end();
    }
}