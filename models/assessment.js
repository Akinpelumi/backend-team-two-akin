const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
    // fileName: {
    //     data: Buffer,
    //     contentType: String
    // },
    question: {
        type: String
    },
    options: {type: {}},
    answer: {type: String,
        },
    // right: {type: String},
     time: {type: Number},
    createdAt: {type: Date, default: Date.now}
   
});

module.exports = mongoose.model("Assessment", AssessmentSchema);