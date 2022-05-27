const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { string, boolean, date } = require("joi");

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNum: { type: Number, required: true },
  address: { type: String, required: true },
  image: [{
    fieldname: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    path: { type: String }
  }],
  // bookIssue: [{
  //   bookInfo: {
  //     bookId:
  //     {type: mongoose.Schema.Types.ObjectId,
  //     ref: "acitivity"},
  //     record: {type: String},
  //     issueDate: {default: Date.now()},
  //     dueDate: { type: Date, default: Date.now() + 7 * 24 * 60 * 60 * 1000 }
  //   }
//}],
  role: { type: String, enum: ["user", "admin"] },
})

userSchema.pre('save', async function (next) {

  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)

  }
})

module.exports = mongoose.model("users", userSchema)