const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"},
     bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"}, 
    issueDate: { type: Date  },
    dueDate: { type: Date },
    returnDate: { type: Date },
    record: { type: String, enum: ["issued", "returned"], default:"issued" }  
})

module.exports = mongoose.model("activity", activitySchema)  