import { Model, StateUser, User } from "./game.types";

export class GameState {
    users : User[] = [];
    userNowID:number = 0;
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
    createUser(model:Model):number {
        this.users.push({
            userID:this.userNowID,
            positionX:0,
            positionY:0,
            positionZ:0,
            rotationX:0,
            rotationY:0,
            rotationZ:0,
            Model:model
        })
        ++this.userNowID;
        return this.userNowID - 1;
    }
    removeUser(userID:number):void{
        this.users = this.users.filter((user:User)=>user.userID !== userID)
    }
    findUser(userID:number):User|undefined {
        return this.users.find((user)=>user.userID == userID)
    }
}
