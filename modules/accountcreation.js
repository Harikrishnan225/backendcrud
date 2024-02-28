const mongoose = require('mongoose');

const studentSignupSchema = new mongoose.Schema({
    emailorphonenumber: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const StudentSignup = mongoose.model('StudentSignup', studentSignupSchema);

module.exports = StudentSignup;
