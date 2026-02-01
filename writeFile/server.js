const http = require('http');
const url = require('url');
const fs = require('fs');
const locale = require("./lang/en/en");

class Server {
    constructor(port) {
        this.port = port
    }

    start() {
        const instance = http.createServer((req, res)=>{this.onReq(req, res)})
        instance.listen(this.port);
    }

    onReq(req, res) {
        const text = url.parse(req.url, true).query.text
        if (text !== undefined) {
            fs.appendFile("./readFile/file.txt", text + "\n", function (err, data) {
                if(err) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end(locale.otherFailure);
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(locale.success + text);
            });
        }
        else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            return res.end(locale.textFailure);
        }
    }

}

new Server(80).start()