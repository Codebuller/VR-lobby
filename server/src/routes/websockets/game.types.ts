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
    Model:Model
}
export enum Model {
'Remy','Character'
}
export enum Type {
    'init','press', 'unPress'
}
export interface RequestObj {
    type:  Type,
    model?:  Model, 
    keyCode?: string,
    
}   