const user = require("../models/user"),
    book = require("../models/book"),
    activity = require("../models/userActivity")

module.exports = {

    //Create Book
    create_book: async (req, res) => {
        try {
            const books = { title, author, ISBN } = req.body;
            const findBook = await book.findOne({ ISBN: req.body.ISBN })
            if (findBook) {
                res.status(400).send("Book already exists", findBook)
            }
            else {
                const newBook = new book({ ...books })
                newBook.save()
                res.status(200).send("Book added succesfully", newBook)
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({
                message: "something went wrong", error
            })
        }
    },

    //Read all books
    get_books: async (req, res) => {
        const { limit, page } = req.query;
        if (!limit, !page) { limit = 5, page = 1 };
        const findBook = await book.find().limit(limit * 1).skip((page - 1) * limit)
        res.status(200).send({ limit, page, findBook })
    },

    //Update book
    update_book: async (req, res) => {
        try {
            const upBook = await book.findByIdAndUpdate({ _id: req.params._id }, { $push: { title: req.body.title, author: req.body.author, ISBN: req.body.ISBN } })
            res.status(200).send("Book updated", upBook)
        } catch (error) {
            res.status(400).send({
                message: error.message || "something went wrong", error
            })
        }

    },

    //Delete book
    delete_book: async (req, res) => {
        try {
            const deleteBook = await book.findOneAndDelete({ id: req.params.id });
            res.status(200).send({ message: "book successfully deleted!!", deleteBook })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                message: error.message || "something went wrong", error
            })
        }
    },


    //Book Assignment API
    issue_book: async (req, res) => {
        try {
            const books = { userId, bookId, issueDate } = req.body
            const newIssue = new activity({ ...books })
            newIssue.save()
            res.status(200).send({
                message:
                    "book has been issued"
            })
        } catch (error) {
            res.status(400).send({
                message: error.message || "something went wrong"
            })        }
    },

    //Return Book API
    return_book: async (req, res) => {
        try {
            const returnBook = await activity.findByIdAndUpdate({ bookId: req.body.bookId }, { userId: req.body.userId }, { $push: { returnDate: req.body.returnDate } })
            res.status(200).send({
                message: "you have returned book", returnBook
            })
        }
        catch (error) {
            res.status(400).send({
                message: error.message || "something went wrong"
            })

        }
    },

}












