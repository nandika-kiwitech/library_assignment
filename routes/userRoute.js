const { authenticate, authorized } = require("../middleware/auth");

const router = require("express").Router(),
     Users = require("../contollers/userController.js"),
     validMid = require("../middleware/joiValidator"),
     schemaa = require("../models/joiSchema"),
     middleware = require("../middleware/auth"),
     upload = require("../middleware/multer"),
     Admin = require("../contollers/adminController")



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - address
 *         - phoneNum
 *         - image
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phoneNum:
 *           type: number
 *         image:
 *           type: string
 *         role:
 *           type: string
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - ISBN
 *         - status
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         ISBN:
 *           type: Number
 *         status:
 *           type: string
 *        
 *         
 *         
 *     
 */



router.post("/signup", Users.create);

router.post("/user-login", Users.user_login);


router.post("/changePassword", middleware.authorized, Users.changePassword);

router.delete("/delete", middleware.authorized, Users.delete);

router.post("/upload", middleware.authorized, upload.single("image"), Users.image);

router.get("/histroy", middleware.authorized, Users.bookHistroy);


module.exports = router
