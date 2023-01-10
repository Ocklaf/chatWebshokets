import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const PORT = 8999;
const server = http.createServer(express);
const wss = new WebSocketServer({ server })

function sendToAll(ws, message, identify = true) {
  wss.clients.forEach(function each(client) {
    const identification = identify ?  clients.get(ws) + ': ' : ''
    client.send(identification + message);
  })
}

const clients = new Map();

wss.on('connection', function connection(ws) {
  let isNewUser = true;
  
  sendToAll(ws, 'Somebody just joined the conversation', false)
  
  ws.on('message', function incoming(data) {
    if (isNewUser) {
      clients.set(ws, data)      
      isNewUser = false
      return
    }
    console.log(data.toString())
    sendToAll(ws, data.toString())
  })
})

server.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}!`)
})
