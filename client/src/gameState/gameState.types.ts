export interface User extends StateUser{
    userID:number
}
export interface StateUser {
    positionX:number,
    positionY:number,
    positionZ:number,
    rotationX:number,
    rotationY:number,
    rotationZ:number,
    model: Model
}
export enum Model {
'Remy','Character'
}
export interface RequestObj {
    type:  Type,
    model?:  Model, 
    keyCode?: string,
    
}
export enum Type {
    'init','press', 'unPress'
}
        