const joiSchema = require("../models/joiSchema")

const validSchema = (schema, property) => {
    (req, res, next) => {
        try {
            const check = joiSchema.validate(req[property], schema)
            if (check == null) {
                next()
            }
        } catch (error) {            
            res.status(404).send("error", error)
        }
    }
}
module.exports = validSchema;
