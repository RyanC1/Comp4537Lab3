const http = require("http");
const url = require("url"); // old parser
const Utils = require("./modules/utils");
const locale = require("./lang/en/en");

const utils = new Utils(locale);
const PORT = 3000;

http
  .createServer((req, res) => {
    // Old Node style: url.parse(req.url, true) gives pathname + query object
    const parsed = url.parse(req.url, true);
    const path = parsed.pathname;

    if (path.startsWith("/COMP4537/labs/3/getDate")) {
      const name = parsed.query.name || "uhhhhhhhhhhhhhhh";

      const html = utils.getDate(name);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(html);
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  })
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/COMP4537/labs/3/getDate/`);
  });
