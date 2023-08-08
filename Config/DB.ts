import mongoose, { StringExpression } from "mongoose"
import env from "dotenv"
env.config()

const DB_string:string = process.env.DB_STRING!

const dbConfig = ()=>{
    try {
        mongoose.connect(DB_string).then(()=>{
            console.log("DataBase Connected!")
        })
    } catch (error) {
        console.log(error)
    }
}

export default dbConfig