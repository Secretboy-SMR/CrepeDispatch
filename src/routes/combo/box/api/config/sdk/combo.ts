import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write(`{"retcode":0,"message":"OK","data":{"vals":{"disable_email_bind_skip":"false","email_bind_remind_interval":"7","email_bind_remind":"true"}}}`);
        res.end();
    }
}