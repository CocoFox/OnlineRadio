var http = require('http');

var express = require('express');
var server = express();
var path = require('path');
let { PythonShell } = require('python-shell')
var bodyParser = require('body-parser');
const fs = require('fs');
let fichier = fs.readFileSync('./server/output_n.json');
let links = JSON.parse(fichier);
var play = 0;
let pyshell = new PythonShell('./server/vlc/play_link.py');

server.get('/radio', function (request, response) {
  response.sendfile(path.resolve('./client/index.html'));
  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });
});


server.get('/output_n', function (request, response) {
  response.send(links);
  
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.get('/stop', function () {
  pyshell.send("stop");
  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });

});
server.post('/post', function (request, response) {
  //response.sendfile(path.resolve('./client/index.html'))
  pyshell.send(request.body.link);
});

server.listen(8080);

//aze
