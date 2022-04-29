import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.write(`{"retcode":0,"message":"OK","data":{"id":"c8820f246a5241ab9973f71df3ddd791","action":"","geetest":{"challenge":"","gt":"","new_captcha":0,"success":1}}}`);
        res.end();
    }
}