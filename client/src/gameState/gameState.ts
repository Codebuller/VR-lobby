import { Scene } from "three";
import { Model, RequestObj, StateUser, Type, User } from "./gameState.types";

export const gameState = new class GameState {
    users : User[] = [];
    updateUser(userID:number, changes:StateUser):void {
        let user  = this.findUser(userID);
        if(user){
            user.positionX = changes.positionX;
            user.positionY = changes.positionY;
            user.positionZ = changes.positionZ;
            user.rotationX = changes.rotationX;
            user.rotationY = changes.rotationY;
            user.rotationZ = changes.rotationZ;
        }
    }
    findUser(userID:number):User|undefined {
        return this.users.find((user)=>user.userID == userID)
    }
}

export const gameStateOnUpdate = (scene:Scene) =>{
let socket = new WebSocket("ws://127.0.0.1:3001");
let reqObj:RequestObj = {type: Type.init,model:Model.Remy}
socket.send(JSON.stringify(reqObj))
socket.onmessage = function(event:MessageEvent) {
    try{
    console.log(event.data)
    gameState.users = JSON.parse(event.data)
    
    }
    catch(er){
        throw new Error(`Server is joking :) ${er}`)
    }
  };


}

