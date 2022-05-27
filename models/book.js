const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({

    title: {type:String, required: true},
    author:  {type:String, required: true},
    ISBN: {type:Number, required: true, unique: true},
    status: {type: String, eNum:["Available", "Issued"], default: "Available"}
})
module.exports= mongoose.model("books", bookSchema)