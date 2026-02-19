import mongoose, { connect } from "mongoose";

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected")
    }catch(err){
        console.log("DB Error")
    }
}
export default connectDb