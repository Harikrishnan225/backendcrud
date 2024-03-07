const mongoose = require('mongoose');


const standardSchema = mongoose.Schema({
    standard: {
        type: Number
    },
    studentscount: {
        type: Number
    },
    teacherscount: {
        type: Number
    }
});

const Standard = mongoose.model('StandardSchema', standardSchema);

module.exports = Standard;