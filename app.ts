import express, { Application,Request,Response } from "express"
import cors from "cors"
import auth from "./Routers/UserRouter"
import task from "./Routers/TaskRouter"

const appConfig = (app:Application)=>{
    app
    .use(cors())
    .use(express.json())
    .use("/api",auth)
    .use("/api",task)


    .get("/",(req:Request,res:Response)=>{
        try {
            res.status(200).json({

                message:"Connected successfully!"
            })
        } catch (error) {
            console.log(error)
        }
    })
}
export default appConfig