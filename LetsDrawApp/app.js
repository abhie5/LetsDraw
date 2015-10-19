var express = require('express');
var app = express();
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080); 
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
var	server = app.listen(app.get('port') ,app.get('ip'),function(){
	console.log('App is running');
});
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
