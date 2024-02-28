const mongoose = require('mongoose');

const connectingToDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/crud');
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        console.log('Connection Failed');
    }
}

connectingToDB();