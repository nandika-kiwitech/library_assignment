require('dotenv').config()
const express = require("express")
const app = express()
const db = require("./db/dbconfig")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/userRoute")
const adminRouter = require("./routes/adminRoute")

app.use("/", router, adminRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port`, process.env.PORT);
});