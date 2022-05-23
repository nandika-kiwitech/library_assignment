const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({

    title: {type:String, required: true},
    author:  {type:String, required: true},
    ISBN: {type:Number, required: true, unique: true},
    users: [
        {userId: {type: mongoose.Schema.Types.ObjectId,
              ref: "users"},
           }]
})
module.exports= mongoose.model("books", bookSchema)