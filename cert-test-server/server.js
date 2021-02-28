var fs = require("fs")
var https = require("https")
var options = {
    key: fs.readFileSync("server-key.pem"),
    cert: fs.readFileSync("server-crt.pem"),
    ca: fs.readFileSync("ca-crt.pem")
}

var server = https.createServer(options, function(req, res) {
    console.log($`{new Date()}
        {req.connection.remoteAddress}
        {req.method}
        {req.url}`)

    res.writeHead(200)
    res.end("Hello World")
}).listen(4433)

console.log("listening on 4433")

process.on("SIGINT", function() {
    server.close(function() {
        process.exit(0)
    })
})
