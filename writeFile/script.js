const http = require('http');
const test = require('./modules/utils')



http.createServer(function (req, res) {
    test.test()
    res.end()
}).listen(8888);