var express = require('express');
var app = express();
var	server = app.listen(3000);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname+'/public'));

//app.get('/',function(req,res){
//	res.sendFile(__dirname + '/index.html');
//});

io.on('connection', function (socket) {
	  socket.emit('init:connection', { data: 'socket connected' });
	  
	  socket.on('draw:line', function (data) {
		    socket.broadcast.emit('draw:line:from:server',data)
	  });
	  socket.on('save:name',function(data){
		  socket.broadcast.emit('save:name:from:server',data);
	  });
});


console.log('LetsDraw is listening port 3000');
