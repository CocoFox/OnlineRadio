var http = require('http');

var express = require('express');
var server = express();
var path = require('path');

server.get('/radio', function (request, response) {
    response.sendfile(path.resolve('./client/index.html'));
<<<<<<< HEAD


});

server.get('/json', function (request, response) {
=======
   
   
   });
   
   server.get('/output_n', function(request, response) {
>>>>>>> a9584df7916a1158a1a49c2a877424e0c4c8462b
    const fs = require('fs')
    let fichier = fs.readFileSync('./online_radio/output_n.json')
    let personne = JSON.parse(fichier)
    response.send(personne);

});

server.get('/', function (request, response) {
    response.sendFile(path.resolve('./server/radios_ubuntu.html'));
});


server.listen(8080);