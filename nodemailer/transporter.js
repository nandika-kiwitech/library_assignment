const nodemailer = require('nodemailer');
const ejs = require("ejs")
const path = require("path")


const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
 }

})

const emailTo = async(email,fullName,role)=>{
    
    var emailFormat = path.join(__dirname, "../views/mailFormat.ejs")
    var data = await ejs.renderFile(emailFormat);
    console.log(email,fullName,role)

    const options = {
        from: "'Nandika' nandikasin00@gmail.com",
        to: email,
        subject: 'Registered',
        html: data

    };
    await transporter.sendMail(options);
    
};


module.exports = transporter;
module.exports = emailTo;