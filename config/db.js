const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect(process.env.MONGO_DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB database")
};

module.exports = connectDB