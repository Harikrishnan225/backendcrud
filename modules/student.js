const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    standard: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});


const Student = mongoose.model('StudentSchema', studentSchema);

module.exports = Student;