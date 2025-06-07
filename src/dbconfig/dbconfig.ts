import mongoose from "mongoose";


export async function connect() {
     try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("Mongodb Connected !!!!")
        })
         connection.on('error',(error)=>{
            console.log("Mongodb Connection Error  ",+ error)
            process.exit()
        })
     } catch (error) {
        console.log("something went wrong")
        console.log(error)
     }
}