import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connected : ${connect.connection.host}`);
    }catch(err){
        console.error(`Error  : ${err.message}`);
        process.exit(1);
    }
}