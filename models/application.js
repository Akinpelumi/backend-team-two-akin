const mongoose = require('mongoose');
const Schema = mongoose.Schema

const applicationSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    school: {
        type: String,
        require: true
    },
    courseOfStudy: {
        type: String,
        require: true
    },
    cgpa: {
        type: Number,
        require: true
    },
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    score: {type: Number},
    file: {}, //This is where I intend setting the upload
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('application', applicationSchema)