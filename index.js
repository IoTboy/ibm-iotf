var mqtt = require('mqtt');
var getmac= require('getmac');
var config = require("./config.json");

getmac.getMac(function(err, macAddress) {
  if (err) throw err;
  var deviceId = macAddress.toString().replace(/:/g, '').toLowerCase();
  console.log("Device ID: " + deviceId);
});

var host = config.org + ".messaging.internetofthings.ibmcloud.com";
var clientId = "d:" + config.org + ":" + config.type + ":" + config.id;
var topic_pub = "iot-2/evt/status/fmt/json";

var client = mqtt.connect(
  {
    host: host,
    port: config.port,
    username: config.username,
    password : config.password,
    clientId : clientId
  });

  console.log('Host: ' + host);
  console.log('Port: ' + config.port);
  console.log('User: ' + config.username);
  console.log('Password: ' + config.password);
  console.log('Client ID: ' + clientId);
  console.log('Topic Sub: ' + topic_pub);

  client.on('connect', function () {
    // client.subscribe(topic_pub);
    console.log('Connected to IBM');
    setInterval(sendMessage, 1000);
  });

  function sendMessage(){
    var value = Math.floor((Math.random() * 30) + 60);
    var message = {
      "d" : {
        "value" : value,
      }
    };
    client.publish(topic_pub, JSON.stringify(message));
    console.log(message);
  }
