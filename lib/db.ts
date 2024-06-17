import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () =>{
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1){
        console.log("Already connected")
        return;
    }

    if(connectionState === 2){
        console.log("Connecting.....")
        return;
    }

    try{
        mongoose.connect(MONGODB_URI!, {
            dbName: "moodiverse",
            bufferCommands: false
        })
        console.log("connected")
    }catch(error){
        console.log("Error in connecting to DB", error)
        throw new Error("Error in connecting to database")
    }
}

export default connect;