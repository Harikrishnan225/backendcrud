const mongoose = require('mongoose');


const studentDetailsSchema = mongoose.Schema({
    studentName: {
        type: String
    },
    studentAddress: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    pinCode: {
        type: Number
    }
});

const StudentDetails = mongoose.model('StudentsDetailsSchema', studentDetailsSchema);

module.exports = StudentDetails;