const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    answer: {type: {}, required: true},
    score: {type: Number, required: true},
    testMark: {type: Boolean, required: true},
    questionId: {type: {type: mongoose.Schema.Types.ObjectId}},
    userId: {type: mongoose.Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('UserScore', userSchema);