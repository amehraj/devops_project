const express = require('express');
const app = express();
const port = 8083;
const http = require('http');
const bodyParser = require('body-parser')
const axios = require('axios')
let state = "";
let stateLog = "";
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  const { state } = req.body
  const DATA = {
    state
  }
  let data = ''
  const HEADER = {
    headers: { Accept: 'application/json' },
  }
  axios
    .put('http://orig:8082/changeState', DATA, HEADER)
    .then((response) => {
        console.log('Req body:', response.data)
        console.log('Req header :', response.headers)
        data = response.data
        console.log(data)
        updateState(data)
    })
    .catch((e) => {
      console.error(e)
    })
  res.end(data)
})

const updateState = (data) => {
  state = data
}

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
  //empty the existing file
  fs.truncate('./public/file.txt', 0, err => {
    if (err) {
      console.error(err);
    }
  });
})
