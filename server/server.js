var http = require('http');

var express = require('express');
var server = express();
var path = require('path');

server.get('/radio', function(request, response) {
    response.sendfile(path.resolve('./client/index.html'));
   
   
   });
   
   server.get('/output_n', function(request, response) {
    const fs = require('fs')
    let fichier = fs.readFileSync('./online_radio/output_n.json')
    let personne = JSON.parse(fichier)
    response.send(personne);    
    
   });

server.listen(8080);