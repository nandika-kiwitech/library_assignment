const jwt = require("jsonwebtoken"),
    user = require("../models/user"),
    activity = require("../models/userActivity"),
    Err = require("../utils/common")


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
       Err.Error_Response
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


module.exports = middleware;
