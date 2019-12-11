var http = require('http');
var cp = require('child_process')
var vlcCommand = require('vlc-command')
var express = require('express');
var server = express();
var path = require('path');
let { PythonShell } = require('python-shell')
var bodyParser = require('body-parser');
const fs = require('fs');
let fichier = fs.readFileSync('./server/output_n.json');
let links = JSON.parse(fichier);
var play = 0 ; 
let pyshell_tab = [];


server.get('/radio', function (request, response) {
  response.sendfile(path.resolve('./client/index.html'));
});


server.get('/output_n', function (request, response) {
  response.send(links);
});
server.use(bodyParser.json() );
server.use(bodyParser.urlencoded({extended: true }));
server.post('/stop',function (request,response){
  //response.sendfile(path.resolve('./client/index.html'))
  stop(request.body.name,response);
});
server.post('/post',function (request,response){
       //response.sendfile(path.resolve('./client/index.html'))
       open(request.body.link, request.body.name,response);

   });

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

function open(link,name,res){
        let pyshell= new PythonShell('./server/vlc/play_link.py');
        pyshell_tab.push([pyshell,name]);
          pyshell.send(link, function (err, data) {
        if (err){
          res.send(err);
        }
      })};
function stop(name,res){
        
          searchInstance(name).send("stop", function (err, data) {
        if (err){
          res.send(err);
        }
      })};
function searchInstance(name){
  pyshell_tab.foreach(element=> {
    if(element[1]==name){ return element};
  });

  };
vlcCommand(function (err, cmd) {
  if (err) return console.error('could not find vlc command path')
  if (process.platform === 'win32') {
    cp.execFile(cmd, ['--version'], function (err, stdout) {
      if (err) return console.error(err)
      console.log(stdout)
    })
  } else {
    cp.exec(cmd + ' --version', function (err, stdout) {
      if (err) return console.error(err)
      console.log(stdout)
    })
  }
  
})

server.listen(8080);
