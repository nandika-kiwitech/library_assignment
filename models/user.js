const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { string, boolean } = require("joi");

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNum: { type: Number, required: true },
  address: { type: String, required: true },
  images: [{
    fieldname: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    path: { type: String }
  }],

  bookIssue: {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "acitivity"
    }
},
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