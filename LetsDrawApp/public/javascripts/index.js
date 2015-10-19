var MainCanvas = document.getElementById("main-canvas");
	var ctx = MainCanvas.getContext("2d");
	var prevX = null,prevY=null;
	var socket = io();
	var DRAW_COLOR = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	
	MainCanvas.addEventListener("touchmove", getXY, false);
	
	ctx.rect(0,0,MainCanvas.width/3,MainCanvas.height);
	ctx.rect(MainCanvas.width/3,0,MainCanvas.width/3,MainCanvas.height);
	ctx.rect(0,0,MainCanvas.width,MainCanvas.height/3);
	ctx.rect(0,MainCanvas.height/3,MainCanvas.width,MainCanvas.height/3);
	ctx.stroke();
	
	function getXY(e){
		
		if(e.buttons == 1){
			   if(!prevX)
				   prevX = e.layerX;
			   if(!prevY)
				   prevY = e.layerY;
			   
			   ctx.strokeStyle = DRAW_COLOR;
			   ctx.beginPath();
			   ctx.moveTo(prevX ,prevY );
			   ctx.lineTo(e.layerX,e.layerY);
			   ctx.lineWidth = 3;
			   ctx.lineJoin = 'round';
			   ctx.lineCap = 'round';
			   ctx.stroke();
			   socket.emit('draw:line',{layerX:e.layerX,layerY:e.layerY,prevX:prevX,prevY:prevY,color:DRAW_COLOR});
			   prevX = e.layerX;
			   prevY = e.layerY;
		   }
	}
	function clearPrevXY(e){
		prevX = null;
		prevY = null;
	}
	
	function postName(e){
		$('#user-list').append('<li style="color:'+DRAW_COLOR+';">'+$('#user-name').val()+'</li>');
		socket.emit('save:name',{
					name: $('#user-name').val(),
					color: DRAW_COLOR
				}
		);
	}
	
	socket.on('init:connection', function (data) {
	    socket.emit('draw:line', { my: 'data' });
	    socket.on('draw:line:from:server',function(data){
			ctx.strokeStyle = data.color;
			ctx.beginPath();
			ctx.moveTo(data.prevX,data.prevY);
			ctx.lineTo(data.layerX,data.layerY);
			ctx.lineWidth = 3;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.stroke();
		});
	    socket.on('save:name:from:server',function(data){
	    	console.log('save:name');
	    	$('#user-list').append('<li style="color:'+data.color+';">'+data.name+'</li>');
		});
	});	