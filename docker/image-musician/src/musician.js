// UDP Sample Client

var HOST = "localhost";
var PORT = 58318;
var dgram = require("dgram");
var uuid = require("uuid/v4");
var UUID = uuid();

var instrument = new Map();
arg = process.argv[2]

instrument.set("piano", "ti-ta-ti");
instrument.set("trumpet", "pouet");
instrument.set("flute", "trulu");
instrument.set("violin", "gzi-gzi");
instrument.set("drum", "boum-boum");

function send() {
	var client = dgram.createSocket("udp4");
	message = JSON.stringify({id : UUID, name : arg, sound : instrument.get(arg)});
	console.log(message);
	client.send(message,0,message.length,PORT,HOST,function(err,byte){
		if(err) throw err;
		client.close;
  });
}

setInterval(send, 1000);