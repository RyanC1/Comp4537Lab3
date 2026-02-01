const http = require('http');
const url = require('url');
const fs = require('fs');
const locale = require("./lang/en/en");

class Server {
    constructor(port) {
        this.port = port
    }

    start() {
        const instance = http.createServer((req, res) => { this.onReq(req, res) })
        instance.listen(this.port, "0.0.0.0");

    }

    onReq(req, res) {
        const filename = url.parse(req.url, true).pathname

        fs.readFile("." + filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end(locale.failure + filename);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(data);
        });
    }

}

const PORT = process.env.PORT || 3000;
new Server(PORT).start();
