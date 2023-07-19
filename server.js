const http = require("http");
const path = require("path");
const fs = require("fs");
const request = require("request");
const apiKey = require("./config");
const getRandomCategory = require("./random_cat");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create server object variable
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "home.html"), (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.url === "/generate-quote") {
    getRandomCategory((error, category) => {
      if (error) {
        console.error("Error:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to generate quote");
      } else {
        const random_category = category;
        request.get(
          {
            url: `https://api.api-ninjas.com/v1/quotes?category=${random_category}`,
            headers: {
              "X-Api-Key": apiKey.apiKey,
            },
          },
          function (error, response, body) {
            if (error) {
              console.error("Request failed:", error);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Failed to generate quote");
            } else if (response.statusCode !== 200) {
              console.error("Error:", response.statusCode);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Failed to generate quote");
            } else {
              const quote = JSON.parse(body)[0];
              const quoted_text = `${quote.quote}\n---${quote.author} (${quote.category})`;

              // Send the quote as a separate response
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end(quoted_text);
            }
          }
        );
      }
    });
  } else if (req.url.startsWith("/send-email")) {
    const encoded_email = req.url.split("=")[1];
    const email= decodeURIComponent(encoded_email)

    // console.log(email)
    getRandomCategory((error, category) => {
      if (error) {
        console.error("Error:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to generate quote");
      } else {
        const random_category = category;
        request.get(
          {
            url: `https://api.api-ninjas.com/v1/quotes?category=${random_category}`,
            headers: {
              "X-Api-Key": apiKey.apiKey,
            },
          },
          function (error, response, body) {
            if (error) {
              console.error("Request failed:", error);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Failed to generate quote");
            } else if (response.statusCode !== 200) {
              console.error("Error:", response.statusCode);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Failed to generate quote");
            } else {
              const quote = JSON.parse(body)[0];
              const quoted_text = `${quote.quote}\n---${quote.author} (${quote.category})`;

              sendEmail(email, quoted_text);
              // Send the quote as a separate response
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end(quoted_text);
            }
          }
        );
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

function sendEmail(email, quoted_text) {
    // console.log(email)
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mayvid007@gmail.com",
      pass: process.env.EMAIL_pass,
    },
  });

  const mailOptions = {
    from: "mayvid007@gmail.com",
    to: email,
    subject: "Quote of the Day",
    text: quoted_text,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error occurred while sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

const port = process.env.PORT || 2000;

server.listen(port, () => console.log(`Server running on port ${port}`));
