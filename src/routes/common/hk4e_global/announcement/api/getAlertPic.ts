import * as http from 'http';
import * as https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.write(`{"retcode":0,"message":"OK","data":{"total":0,"list":[]}}`);
        res.end();
    }
}