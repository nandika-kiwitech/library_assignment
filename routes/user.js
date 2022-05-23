const { authenticate, authorized } = require("../middleware/auth");

const router = require("express").Router(),
     Users = require("../contollers/userController.js"),
     validMid = require("../middleware/joiValidator"),
     schemaa = require("../models/joiSchema"),
     middleware = require("../middleware/auth"),
     upload = require("../middleware/multer"),
     Admin = require("../contollers/adminController")



router.post("/signup", Users.create);

router.post("/login", Users.login);

router.post("/changePassword",middleware.authorized, Users.changePassword);

router.delete("/delete", middleware.authorized, Users.delete);

 router.post("/upload",  middleware.authorized, upload.single("image"),  Users.image);

router.post("/book", middleware.authorized,middleware.authorized, Admin.create_book);

router.get("/book/:id",middleware.authorized,middleware.authorized, Admin.get_books);

router.get("/books",middleware.authorized,middleware.authorized, Admin.get_books);

router.post("/return",middleware.authorized,middleware.authorized, Admin.return_book);

router.delete("/deleteBook/:id",middleware.authorized,middleware.authorized, Admin.delete_book);

router.put("/updateBook", middleware.authorized,middleware.authorized, Admin.update_book);

router.post("/issue", middleware.authorized,middleware.authorized, middleware.issue, Admin.issue_book);


module.exports = router
