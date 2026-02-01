const http = require("http");
const url = require("url");
const Utils = require("./modules/utils");
const locale = require("./lang/en/en");

class Server {
  constructor(port) {
    this.port = port
    this.utils = new Utils(locale);
  }

  start() {
    const instance = http.createServer((req, res) => { this.onReq(req, res) })
    instance.listen(this.port, "0.0.0.0");
  }

  onReq(req, res) {
    const name = url.parse(req.url, true).query.name;

    if (name) {
      const html = this.utils.getDate(name);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(html);
    } else {
      res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(locale.failure);
    }
  }

}

const PORT = process.env.PORT || 3000;
new Server(PORT).start();
