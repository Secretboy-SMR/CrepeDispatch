import * as http from 'http';
import * as https from 'https';


export default class check {
    static async get(req: http.IncomingMessage, res: http.ServerResponse){
        res.write(`<!DOCTYPE html>
        <html>
           <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

              <title>Test</title>
           </head>
        <body>
            <h>hi </h>
        
            <script type="text/javascript">
                //something here
            </script>
        </body></html>
        `)
        res.end();
    }
}