const mongoose = require("mongoose"),
    user = require("../models/user"),
    book = require("../models/book"),
    bcrypt = require('bcryptjs'),
    jwt = require("jsonwebtoken"),
    activity = require("../models/userActivity"),
    emailTo = require('../nodemailer/transporter'),
    Err = require("../utils/common"),
    Pagination = require("../utils/constants")


module.exports = {

    create: async (req, res) => {
        const details = { fullName, phoneNum, email, password, address, role, adminCode } = req.body
        try {
            //verify existing user
            const check = await user.findOne({ email: req.body.email })
            const check2 = await user.findOne({ role: "admin" })

            if (check) {
                res.status(400).send({
                    message: "email already exists"
                })
            }
            else if (role == "user") {
                const newUser = new user({ ...details })
                newUser.save()

                //sending confirmation email
                const email = req.body.email,
                    fullName = req.body.fullName,
                    role = req.body.role

                emailTo(
                    email, fullName, role
                )
                res.status(200).send({
                    message: "user created successfully",
                    newUser
                })
            }
            else if (check2) {
                res.status(400).send({
                    message: "Admin account already exists"
                })
            }
            else {
                if (adminCode == process.env.ADMIN_CODE) {
                    const newAdmin = new user({ ...details })
                    newAdmin.save()

                    res.status(200).send({
                        message: "Admin created successfully",
                        newAdmin
                    })
                }
                else {
                    res.status(400).send({
                        message: "ADMIN CODE REQUIRED!!!"


                    })
                }

            }

        } catch (error) { return Err.Error_Response }

    },

    user_login: async (req, res) => {
        const password = req.body.password

        const verifyUser = await user.findOne({ email: req.body.email })
        if (!verifyUser) {
            res.status(400).send({
                message: "Incorrect email, please login with registered account"
            })
        }
        if (verifyUser.role != "user") {
            res.status(400).send({
                message: "This login with user account only"
            })
        }
        const hashedPassword = await bcrypt.compare(password, verifyUser.password)
        if (!hashedPassword) {
            res.status(400).send("password not match")
        }
        else {
            const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_KEY)
            res.status(200).send({
                Message: "you are succesfully loggedIn",
                token
            })


        }
    },

    delete: async (req, res) => {
        try {
            const deleteUser = await user.findOneAndDelete({ id: req.user.id });
            res.status(200).send({
                message: "user successfully deleted!!",
                deleteUser
            })
        } catch (error) { return Err.Error_Response }

    },

    changePassword: async (req, res) => {
        try {
            const password = req.body.password;
            const newPassword = req.body.newPassword;
            const userInfo = await user.findOne({ _id: req.user.id });
            if (!userInfo) {
                res.status(400).send("user not found")
            }
            const hashedPassword = await bcrypt.compare(req.body.password, userInfo.password)
            if (!hashedPassword) {
                res.status(400).send("Old password incorrect.")
            }

            //hashPassword 
            const newhash = await bcrypt.hash(newPassword, 10)
            await User.updateOne({ _id: req.user.id }, { password: newhash });
            res.status(200).send({ message: "Password change successfully." });
        }
        catch (error) {
            console.log("eror", error)
            res.status(400).send("error")
        }

    },

    image: async (req, res) => {
        var upImage = await user.findByIdAndUpdate({ _id: req.user.id }, { $push: { image: req.file.image }, upsert: true, returnNewDocument: true })
        res.status(200).send(" profile photo updated")
    },

    //All assigned book histroy with date filter
    bookHistroy: async (req, res) => {
        try {
            Pagination.Page = req.query
            let id = req.user.id
            let query = req.query
            const findBooks = await activity.findById(id, query).limit(limit * 1).skip((page - 1) * limit)
            console.log(req.user.id)
            res.status(200).send(findBooks)
        } catch (error) { return Err.Error_Response }



    }
}