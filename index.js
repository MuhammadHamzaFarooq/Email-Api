"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// Global Middleware
app.use(express.json());
app.use(cors());

const PORT = 8000;

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "somerealemail@gmail.com",
      pass: "realpasswordforaboveaccount",
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome in Matrix ptv LTD");
});

app.post("/contact", (req, res) => {
  console.log(req.body);

  try {
    let mailOptions = {
      from: "somerealemail@gmail.com",
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.comments,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({
          message: "something went wrong",
          err: error.message,
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.send({
          message: "Email sent:",
          details: req.body,
          information: info.response,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      err: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up on running on port ${PORT}`);
});
