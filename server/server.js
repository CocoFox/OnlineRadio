var http = require('http');

var express = require('express');
var server = express();
var path = require('path');

server.get('/radio', function(request, response) {
    response.sendfile(path.resolve('./index.html'));
   });
server.listen(8080);