import * as http from 'http';
import * as https from 'https';
import * as fs from "fs";

import route from './routes/route';

export function log(...args: any[]) {
    console.log(`CONSOLE: ${args.join(" ")}\n`);
}
type IRoute = typeof import("./routes/route");
export default class Dispatch{
    httpServer?: http.Server;
    httpsServer?: https.Server;

    constructor(public httpPort: number,public httpsPort: number){

    }

    public start(){
        if(this.httpServer || this.httpsServer){
            log("already started");
            return;
        }

        this.httpServer = http.createServer(this.handleRequest);

        this.httpsServer = https.createServer({
            key: fs.readFileSync('./src/cert/ys.key'),
            cert: fs.readFileSync('./src/cert/ys.crt')
          }, this.handleRequest);

        this.httpServer.listen(80, '127.0.0.1');
        this.httpsServer.listen(443, '127.0.0.1');

        log(`started on port ${this.httpPort} and ${this.httpsPort}`);
    }
    public stop(){
        if(!this.httpServer ||!this.httpsServer){
            log("already stopped");
            return;
        }
        this.httpServer.close();
        this.httpsServer.close();
        this.httpServer = undefined;
        this.httpsServer = undefined;
    }


    async handleRequest(req: http.IncomingMessage, res: http.ServerResponse){
        const url: URL = new URL(req.url!, `http://${req.headers.host}`);
        console.log(url.pathname.split('?')[0]);
        const data = {
            path: url.pathname.split('?')[0],
        }
        if(url.pathname.includes(".ico")){
            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            })
            res.write(fs.readFileSync(`./src/routes/crepe.ico`));
            res.end();
            return;
        }
        try{
            let route = await import(`./routes${data.path}`) as IRoute;
            route.default.get(req, res);

        }catch(e){
            try{
                let rsp = await fs.readFileSync(`./routes${data.path}`);
                res.end(rsp)
            }catch(e){
                //log(e)
                res.end("404");
            }
        }
    }
}