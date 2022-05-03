import http from 'http';
import https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(`{"retcode":0,"message":"OK","data":{"marketing_agreements":[]}}`);
    }
}