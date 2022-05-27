const jwt = require("jsonwebtoken"),
    user = require("../models/user"),
    activity = require("../models/userActivity")

const middleware = {}

middleware.authorized = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        const decode = jwt.verify(authorization, process.env.TOKEN_KEY)
        const findUser = await user.findOne({ email: decode.email });
        if (!findUser) {
            res.status(400).res.send({ message: "email not found", email })
        }
        req.user = findUser;

        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).send("Invalid Token");
    }
}

middleware.authenticate = async (req, res, next) => {
    const role = req.user.role
    if (role == "admin") {
        next()
    }
    else {
        res.status(400).send({
            message: "Only Admin can do this action"
        })
    }

}

middleware.issue = async (req, res, next) => {
    const findBook = await activity.findOne({ bookId: req.body.bookId })
    req.book = findBook
    if (findBook) {
        const currentStatus = req.book.currentStatus
        if (currentStatus == "issued") {
            res.status(400).send("Sorry, Book is not available")
        }
    }
    else {
        next()
    }
}




module.exports = middleware;
