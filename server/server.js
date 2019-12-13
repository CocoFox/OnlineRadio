var http = require('http');
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
var vlcCommand = require('vlc-command');
var cp = require('child_process');
var http = require('http');
var port = 9000;
let tab_openedlinks = [];
var nb_port=0;
/*
vlcCommand(function (err, command) {
  if (err) throw err
  if (process.platform === 'win32') {
    cp.execFile(command, onExit)
  } else {
    cp.exec(command, onExit)
  }
});*/

console.log(tab_openedlinks);
function onExit (err, stdout, stderr) {
  console.log(stdout)
  console.error(stderr)
  if (err) 
    console.log(err);
  };


server.get('/radio', function (request, response) {
  response.sendfile(path.resolve('./client/index.html'));
  // pyshell.on('message', function (message) {
  //   // received a message sent from the Python script (a simple "print" statement)
  //   console.log(message);
  // });
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
       open(request.body.link,response);
       

   });

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
function open(link,res){

  var port_temp=searchLink(link);
  console.log("port temp" + port_temp);
  
  if (port_temp){
    var response={ p : port_temp}
    res.send(response)
    
  }
  else {
    tab_openedlinks[link]=port;
    vlcCommand(function (err) {
      if (err) throw err
      if (process.platform === 'win32') {
        cp.execFile("vlc -vvv " + link + " --sout '#standart { access = http, mux= mp3, dst=localhost: "+port+ "}'" , onExit)
      } else {
        cp.exec("vlc -vvv " + link + " --sout '#standart { access = http, mux= mp3, dst=localhost: " +port+"}'" , onExit)
      }
    });
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function demo() {
      console.log('Taking a break...');
      await sleep(2000);
      console.log('Two seconds later, showing sleep in a loop...');
      // Sleep in loop
      for (let i = 0; i < 3; i++) {
        if (i === 2)
          await sleep(2000);
        console.log(i);
      }
    }
    demo();


    var response={ p : port}
    res.send(response);
    port++;
  }
        /*let pyshell= new PythonShell('./server/vlc/play_link.py');
        pyshell_tab.push([pyshell,name]);
          pyshell.send(link, function (err, data) {
        if (err){
          res.send(err);
        }
      })*/
    };
function stop(name,res){
        
          searchInstance(name).send("stop", function (err, data) {
        if (err){
          res.send(err);
        }
      })};
function searchLink(link){

  for (var key_link in tab_openedlinks){
    if(key_link == link) return tab_openedlinks[key_link];
  }
  return 0;
};
server.listen(8080);
