const http = require('http');
const url = require('url');
const fs = require('fs');
const Utils = require('./getDate/modules/utils');
const getDateLocale = require('./getDate/lang/en/en');
const readFileLocale = require('./readFile/lang/en/en');
const writeFileLocale = require('./writeFile/lang/en/en');

class ConsolidatedServer {
    constructor(port) {
        this.port = port;
        this.utils = new Utils(getDateLocale);
    }

    start() {
        const instance = http.createServer((req, res) => { this.onReq(req, res) });
        instance.listen(this.port, "0.0.0.0");
        console.log(`Server running on http://localhost:${this.port}`);
        console.log(`Endpoints:`);
        console.log(`  - GET /COMP4537/labs/3/getDate/?name=YourName`);
        console.log(`  - GET /writeFile?text=YourText`);
        console.log(`  - GET /readFile/file.txt`);
    }

    onReq(req, res) {
        const parsed = url.parse(req.url, true);
        const pathname = parsed.pathname;
        const query = parsed.query;

        // Route 1: getDate endpoint
        if (pathname.startsWith('/COMP4537/labs/3/getDate')) {
            return this.handleGetDate(query, res);
        }

        // Route 2: writeFile endpoint
        if (pathname === '/writeFile') {
            return this.handleWriteFile(query, res);
        }

        // Route 3: readFile endpoint
        if (pathname.startsWith('/readFile')) {
            return this.handleReadFile(pathname, res);
        }

        // 404 error
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('404 Not Found');
    }

    // getDate endpoint (from the getDate server.js)
    handleGetDate(query, res) {
        const name = query.name;

        if (name) {
            const html = this.utils.getDate(name);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            return res.end(html);
        } else {
            res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
            return res.end(getDateLocale.failure);
        }
    }

    // writeFile endpoint (from the writeFile server.js)
    handleWriteFile(query, res) {
        const text = query.text;
        if (text !== undefined) {
            fs.appendFile("./readFile/file.txt", text + "\n", function (err, data) {
                if (err) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end(writeFileLocale.failure);
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(writeFileLocale.success + text);
            });
        }
        else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            return res.end(writeFileLocale.failure);
        }
    }

    // readFile endpoint (from the readFile server.js)
    handleReadFile(pathname, res) {
        const filename = pathname;

        fs.readFile("." + filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end(readFileLocale.failure + filename);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(data);
        });
    }
}

const PORT = process.env.PORT || 3000;
new ConsolidatedServer(PORT).start();
