const user = require("../models/user"),
    book = require("../models/book"),
    activity = require("../models/userActivity"),
    bcrypt = require('bcryptjs'),
    jwt = require("jsonwebtoken"),
    Err = require("../utils/common"),
    Pagination = require("../utils/constants")


module.exports = {
    //Admin-login
    admin_login: async (req, res) => {
        try {
            const password = req.body.password;
            const verifyUser = await user.findOne({ email: req.body.email })
            if (!verifyUser) {
                res.status(400).send({
                    message: "Incorrect email, please login with registered account"
                })
            }
            if (verifyUser.role != "admin") {
                res.status(400).send({
                    message: "This login with admin account only"
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

        } 
        catch (error) {return Err.Error_Response}

    },

    //Create Book
    create_book: async (req, res) => {
        try {
            const books = { title, author, ISBN } = req.body;
            const findBook = await book.findOne({ ISBN: req.body.ISBN })
            if (findBook) {
                res.status(400).send({ Message: "Book already exists", findBook })
            }
            else {
                const newBook = new book({ ...books })
                newBook.save()
                res.status(200).send({ Message: "New book issued", newBook })
            }
        } catch (error) {
            return Err.Error_Response
        }
    },

    //Read all books
    get_books: async (req, res) => {
       Pagination.Page = req.query
        const findBook = await book.find().limit(limit * 1).skip((page - 1) * limit)
        res.status(200).send({ limit, page, findBook })
    },

    //Update book
    update_book: async (req, res) => {
        try {
            const upBook = await book.findByIdAndUpdate({ _id: req.params._id }, { $push: { title: req.body.title, author: req.body.author, ISBN: req.body.ISBN } })
            res.status(200).send({ Message: "updated book", upBook })
        }
        catch (error) { return Err.Error_Response }
    },

    //Delete book
    delete_book: async (req, res) => {
        try {
            const deleteBook = await book.findOneAndDelete({ id: req.params.id });
            res.status(200).send({ message: "book successfully deleted!!", deleteBook })
        } catch (error) {
            console.log(error)
            return Err.Error_Response
        }
    },


    //Book Assignment API
    issue_book: async (req, res) => {
        try {
            const { bookId, userId, issueDate } = req.body;
            let startDate = new Date(issueDate);
            let day = 7 * 60 * 60 * 24 * 1000;
            req.body.dueDate = new Date(startDate.getTime() + day);
            const { dueDate } = req.body;
            const findBook = await book.findById(req.body.bookId)
            if (findBook.status == "Issued") {
                res.status(400).send("Book is not available")
            }
            else {
                const findActivity = await activity.findOne();
                const newIssue = new activity({ userId, bookId, issueDate, dueDate })
                newIssue.save()
                const id = req.body.bookId
                const update = await book.findByIdAndUpdate(id, { $set: { status: "Issued" }, upsert: true, returnNewDocument: true })
                res.status(200).send({
                    message:
                        "book has been issued", newIssue
                })
            }
        }
        catch (error) {
            return Err.Error_Response
        }
    },

    //Return Book API
    return_book: async (req, res) => {
        try {
            const query = {
                $and: [{ userId: req.body.userId }, { bookId: req.body.bookId }, { _id: req.params._id }]
            }
            const findBook = await activity.findOne(query)
            if (findBook.record == 'returned') {
                res.status(400).send({ message: "This book has been already returned" })
            }
            else {
                const returnBook = await activity.findByIdAndUpdate({ _id: req.params._id }, { $set: { record: 'returned' }, upsert: true, returnNewDocument: true })
                const id = req.body.bookId
                const update = await book.findByIdAndUpdate(id, { $set: { status: "Available" }, upsert: true, returnNewDocument: true })
                res.status(200).send({
                    message: "you have returned book", returnBook
                })
            }
        }
        catch (error) { return Err.Error_Response }
    },

    //all issued books
    issuedBook: async (req, res) => {
        try {
            Pagination.Page = req.query
            const Days = req.query.Days;
            const pipeline = [{
                $project:
                {
                    days:
                    {
                        $dateDiff:
                        {
                            startDate: new Date(),
                            endDate: "$issueDate",
                            unit: "day"
                        }
                    }
                }
            },
            {
                $match:
                    { days: Days }
            }]
            const findBooks = await activity.aggregate(pipeline)
            res.status(200).send({ message: "All the issued book", findBooks })
        } catch (error) {
            return Err.Error_Response
        }
    },

    //get all users by populating on the basis of bookId
    bookId: async (req, res) => {
        try {
            Pagination.Page = req.query
            const findUser = await activity.find({ bookId: req.params.id }).populate({ path: "userId" })
            res.status(400).send(findUser)
        } catch (error) {
            return Err.Error_Response
        }
    },

}












