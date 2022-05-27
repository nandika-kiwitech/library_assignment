const mongoose=require(`mongoose`)
mongoose
    .connect("mongodb://localhost:27017/Library", { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to database")       
    })
    