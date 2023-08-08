import mongoose from "mongoose";

interface iAuth {
    username?:string,
    email?:string,
    password?:string,
    avatar?:string,
    avatarID?:string,
    task: {}[],
}

export interface iAuthData extends iAuth,mongoose.Document{}

export interface iTask{
Task: string
}


