import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.write(`{"retcode":0,"message":"OK","data":{"protocol":true,"qr_enabled":false,"log_level":"INFO","announce_url":"https://webstatic-sea.hoyoverse.com/hk4e/announcement/index.html?sdk_presentation_style=fullscreen\u0026sdk_screen_transparent=true\u0026game_biz=hk4e_global\u0026auth_appid=announcement\u0026game=hk4e#/","push_alias_type":2,"disable_ysdk_guard":false,"enable_announce_pic_popup":true}}`);
        res.end();
    }
}