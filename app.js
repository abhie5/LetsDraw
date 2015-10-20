var express = require('express');
var http = require('http');
var app = express();
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080); 
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

var server = http.createServer(app).listen(app.get('port') ,app.get('ip'),function(){
	console.log('App is running at '+ app.get('ip') +':'+ app.get('port'));
});
var io = require('socket.io').listen(server);
app.use(express.static(__dirname+'/public'));

io.on('connection', function (socket) {
	  socket.emit('init:connection', { data: 'socket connected' });
	  
	  socket.on('draw:line', function (data) {
		    socket.broadcast.emit('draw:line:from:server',data)
	  });
	  socket.on('save:name',function(data){
		  socket.broadcast.emit('save:name:from:server',data);
	  });
});