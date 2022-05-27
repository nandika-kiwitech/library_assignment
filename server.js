require('dotenv').config()
const express = require("express")
const app = express()
const db = require("./db/dbconfig")

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management",
      version: "0.1.0",
    },   
    
    security: [{
      jwt: []
    }],   
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/userRoute.js"],
};




const specs = swaggerJsDoc(options);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs)
);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/userRoute")
const adminRouter = require("./routes/adminRoute")

app.use("/", router, adminRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port`, process.env.PORT);
});