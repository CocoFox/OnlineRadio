var http = require('http');

var express = require('express');
var server = express();
var path = require('path');

server.get('/radio', function(request, response) {
    response.sendfile(path.resolve('./client/index.html'));
   
   
   });
   
   server.get('/json', function(request, response) {
    const fs = require('fs')
    let fichier = fs.readFileSync('./server/personne.json')
    let personne = JSON.parse(fichier)
    response.send(personne);    
    
   });

server.listen(8080);