var http = require('http');

var express = require('express');
var server = express();
var path = require('path');
let {PythonShell} = require('python-shell')
var bodyParser = require('body-parser');
const fs = require('fs');
let fichier = fs.readFileSync('./server/output_n.json');
let links = JSON.parse(fichier);
var play = 0 ; 

server.get('/radio', function (request, response) {
    response.sendfile(path.resolve('./client/index.html'));
   });
   
   server.get('/output_n', function(request, response) {
    response.send(links);
});
  
server.use(bodyParser.json() );
server.use(bodyParser.urlencoded({extended: true }));

server.get('/run', runPy);
server.post('/post',function (request,response){
       //response.sendfile(path.resolve('./client/index.html'))
       runPy(request.body.link,response);
       console.log(request.body.link);  

   })


function runPy(link,res){
        var options = {
            args:
            [
              play=1, // starting funds
              link, // wager count — number of wagers per sim
            ]
          }
          PythonShell.run('.\\server\\vlc\\play_link.py', options, function (err, data) {
        if (err){
          res.send(err);
          console.log(err);
        }
      })};

server.listen(8080);

//aze
