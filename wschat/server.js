var http = require('http');
var WebSocketServer = require('websocket').server;
var server = http.createServer(function(req, res) {
	res.writeHead(403, {'Content-Type' : 'text/html'});
	var html = '<html><head><title>chat</title>';
	html += '</head>';
	html += '<body>';
        html += 'Forbidden</body></html>';
	res.end(html);
});

wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});
var cons = new Array();
wsServer.on('request', function(request) {
	var con = request.accept(null, request.origin);
        cons.push(con);
	con.on('message', function(ms) {
		console.log(ms);
		var recvdata = JSON.parse(ms.utf8Data);
		var senddata = {
                    "msg":"\t"+recvdata.msg, 
		    "name":recvdata.name, 
		    "color":recvdata.color
		};
		for (var c in cons) {
		    cons[c].sendUTF(JSON.stringify(senddata));
		}
	});
});
server.listen(7000, "localhost");
console.log("server running at http:localhost:7000");