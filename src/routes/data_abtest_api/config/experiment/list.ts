import * as http from 'http';
import * as https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.write(JSON.stringify({"retcode":0,"success":true,"message":"","data":[{"code":1000,"type":2,"config_id":"14","period_id":"6036_99","version":"1","configs":{"cardType":"old"}}]}));
        res.end();
    }
}