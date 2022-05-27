const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
        ref: "users"},
    bookId: {type: mongoose.Schema.Types.ObjectId,
            ref: "books"},
    currentStatus:   {type: String, enum:["issued", "returned"], required: true},
    issueDate : {type : Date, default : Date.now()},
    returnDate : {type : Date}
})

module.exports = mongoose.model("activity", activitySchema)