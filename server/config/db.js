import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI);
        console.log('Db Connected!')
    }
    catch (error) {
        console.log(`MongoDB Error : ${console.log(error.message)}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;