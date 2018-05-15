// UDP Sample Client

var MULTICAST_ADRESS = '239.255.36.36';
var PORT = 8888;
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
	client.send(message,0,message.length,PORT,MULTICAST_ADRESS,function(err,byte){
		if(err) throw err;
		client.close;
  });
}

setInterval(send, 1000);