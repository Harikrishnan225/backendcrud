const mongoose = require('mongoose');

const teachersSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    standard: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})


const Teachers = mongoose.model('TeachersSchema', teachersSchema);

module.exports = Teachers;