const router = require("express").Router(),
     validMid = require("../middleware/joiValidator"),
     schemaa = require("../models/joiSchema"),
     middleware = require("../middleware/auth"),
     Admin = require("../contollers/adminController")





 router.post("/admin-login", Admin.admin_login);



router.post("/admin-login", Admin.admin_login);

router.post("/book", middleware.authorized, middleware.authenticate, Admin.create_book);

router.get("/books", middleware.authorized, middleware.authenticate, Admin.get_books);

router.put("/updateBook", middleware.authorized, middleware.authenticate, Admin.update_book);

router.delete("/deleteBook/:id", middleware.authorized, middleware.authenticate, Admin.delete_book);

//Assign book route
router.post("/issue", middleware.authorized, middleware.authenticate, Admin.issue_book);

//return Book route
router.post("/return/:_id", middleware.authorized, middleware.authenticate, Admin.return_book);

//allIssuedBook route
router.get("/title", middleware.authorized, middleware.authenticate, Admin.issuedBook)

//get all users by populating with bookId
router.get("/getUsers/:id", middleware.authorized, middleware.authenticate, Admin.bookId)



module.exports = router
