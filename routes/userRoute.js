const { authenticate, authorized } = require("../middleware/auth");

const router = require("express").Router(),
     Users = require("../contollers/userController.js"),
     validMid = require("../middleware/joiValidator"),
     schemaa = require("../models/joiSchema"),
     middleware = require("../middleware/auth"),
     upload = require("../middleware/multer"),
     Admin = require("../contollers/adminController")



router.post("/signup", Users.create);

router.post("/user-login", Users.user_login);


router.post("/changePassword", middleware.authorized, Users.changePassword);

router.delete("/delete", middleware.authorized, Users.delete);

router.post("/upload", middleware.authorized, upload.single("image"), Users.image);

router.get("/histroy", middleware.authorized, Users.bookHistroy);


module.exports = router
