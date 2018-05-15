// UDP Sample Client

var HOST = "localhost";
var PORT = 58318;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var uuid = require("uuid/v4");
var UUID = uuid();

var instrument = new Map();

instrument.set("piano", "ti-ta-ti");
instrument.set("trumpet", "pouet");
instrument.set("flute", "trulu");
instrument.set("violin", "gzi-gzi");
instrument.set("drum", "boum-boum");

function send(message) {
	client.send(message,0,message.length,PORT,HOST,function(err,byte){
		console.log("message sent to " + HOST + ":" + PORT);
  });
}

var message = JSON.stringify({id : UUID, noise : instrument.get(process.argv[2])});
console.log("message : " + message);
setInterval(send, 1000, message);