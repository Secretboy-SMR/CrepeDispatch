import * as http from 'http';
export default class route{
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('lolwtf');
        res.end();
    }
}