'use strict'

import { SocketStream } from "@fastify/websocket"
import { FastifyRequest } from "fastify"
import { GameState } from "./gameState"
import { Model, RequestObj, StateUser, Type } from "./game.types"
const fastify = require('fastify')()
fastify.register(require('@fastify/websocket'))
const gameState = new GameState();
fastify.register(async function (fastify:any) {
  fastify.get('/', { websocket: true }, (connection:SocketStream, req:FastifyRequest) => {
    connection.socket.send('hi from server')
    const id = gameState.userNowID;
    ++gameState.userNowID;
    connection.socket.on('message', (message:string) => {
      try{ 
        let mesObj:RequestObj = JSON.parse(message)
        switch (mesObj.type){
          case Type.init:
            if(mesObj.model)
              gameState.createUser(mesObj.model);
            break;
          case Type.press:
            break;
          case Type.unPress:
            break;
          
        }
        let state:StateUser =  JSON.parse(message);
        gameState.updateUser(id,state);
        connection.socket.send(JSON.stringify(gameState.users)) 
       }
       catch{
        connection.socket.send(`Unvalid Message`) 
       }
    })
    connection.socket.on('close',()=>{
      connection.socket.send(`Пока игрок под номером ${id}`) 
      gameState.removeUser(id);
      
    })
    
    
    
  })
})
setInterval(()=>{
  for(let client of fastify.websocketServer.clients) {
    client.send(JSON.stringify(gameState.users));
}
},2000)

fastify.listen({ port: 3001 }, (err:Error) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
