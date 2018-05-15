// UDP Sample Server
var HOST = '0.0.0.0';
var MULTICAST_ADRESS = '239.255.36.36'
var PORT_UDP = 58318;
const PORT_TCP = 2205;

var dgram = require("dgram");
var moment = require("moment");
var server_udp = dgram.createSocket("udp4");
const net = require('net');

var tabMusicien = new Map()

function Musicien(uuid,instrument,activeSince){
    this.uuid = uuid;
    this.instrument = instrument;
    this.activeSince = activeSince;
}

/*******************************************
*                  TCP                     *
********************************************/
tcp_server = net.createServer(onClientConnected);
tcp_server.listen(PORT_TCP, HOST);
console.log("TCP Server listing on " + HOST + ":" + PORT_TCP);

function onClientConnected(socket) {
    var tabMusiciens = []

    for(var [key,value] of tabMusicien){
        tabMusiciens.push(value);
    }
    socket.write(JSON.stringify(tabMusiciens));
    socket.destroy();
}


/*******************************************
*                  UDP                     *
********************************************/

server_udp.bind(PORT_UDP, function(){
	console.log("Un auditeur a rejoind le concert");
	server_udp.addMembership(MULTICAST_ADRESS);
});

server_udp.on("listening", function () {
    var address = server_udp.address();
    console.log("UDP Server listening " + address.address + ":" + address.port);
});

server_udp.on("message", function (msg, rinfo) {
    console.log(msg.toString())
    var jsonObject = JSON.parse(msg.toString());
    tabMusicien.set(jsonObject.id, new Musicien(jsonObject.id,jsonObject.name,moment().format("YYYY-MM-DD HH:mm:ss")));
});

function checkActivity(){
    for(var [key,value] of tabMusicien){
        var now = moment()
        var rec = moment(value.activeSince)

        var diff = moment.duration(now.diff(rec)).as("seconds")

        if(diff > 5){
            tabMusicien.delete(key)
        }
    }
}

setInterval(checkActivity,1000)
