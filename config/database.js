const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dbUri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000,
        };
        await mongoose.connect(dbUri, options);
        console.log(`Connected to database: ${process.env.DB_NAME}`);
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
