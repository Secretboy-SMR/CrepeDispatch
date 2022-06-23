import * as http from 'http';
import * as https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse) {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.write(
            JSON.stringify({
                "retcode": 0,
                "message": "OK",
                "data": {
                    "vals": {
                        "disable_email_bind_skip": "false",
                        "email_bind_remind_interval": "7",
                        "email_bind_remind": "true" 
                    }   
                }
            }));
        res.end();
    }
}