const express = require('express');
const app = express();
const port = 8083;
const http = require('http');
let state = "";
let stateLog = "";

app.get('/messages', async (req, res) => {
    const request = http.request({
        host: 'httpserv',
        port: 8081,
        path: '/',
        method: 'GET',
        headers: {
          
        }
      }, function(response) {
        var data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          res.end(data);
        });
      });
      request.end();

})

app.put('/state', async (req, res) => {

})

app.get('/state', async (req, res) => {
    console.log(state);
    res.setHeader('content-type', 'text/plain');
    res.send(state);
})

app.get('/run-log', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(stateLog);
})

app.listen(port, () => {
  const dateInit = new Date(Date.now());
  const timestampInit = dateInit.toISOString();
  state = "INIT";
  stateLog += timestampInit + " " + state + "\r\n";
  const dateRunning = new Date(Date.now());
  const timestampRunning = dateRunning.toISOString();
  state = "RUNNING";
  stateLog += timestampRunning + " " + state + "\r\n";
  console.log(`App listening on port ${port}`)
})
