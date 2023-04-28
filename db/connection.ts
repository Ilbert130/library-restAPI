import mongoose from "mongoose";


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN || '');
    
        console.log('Online database');

    } catch (error) {
        console.log(error);
        throw new Error('Error to initialize the database');
    }

}

export default dbConnection;