require("dotenv").config();
const nodemailer = require("nodemailer");
const Quote = require("./quotegen");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mayvid007@gmail.com",
    pass: process.env.EMAIL_pass,
  },
});

const { quote, author, category } = Quote;
console.log(Quote);

const email_body = `Quote for the day: ${quote}\n Author: ${author}\n Category: ${category}`;

const mailOptions = {
  from: "mayvid007@gmail.com",
  to: "divbillowria@gmail.com",
  subject: "Hello from Nodemailer",
  text: email_body,
};

transport.sendMail(mailOptions, (err, res) => {
  if (err) console.error(err);
  else console.log("mail sent: ", res);
});
