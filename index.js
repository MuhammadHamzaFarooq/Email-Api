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
      user: "info.matrixtech01@gmail.com",
      pass: "Matrix786",
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome in Matrix ptv LTD");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  console.log("email" ,req.body.email,req.body.subject);

  try {
    let mailOptions = {
      from: '"matrixtech01"<info.matrixtech01@gmail.com>', // sender address
      to: req.body.email,
      recipients:[],
      subject: req.body.subject,
      text: req.body.comments,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({
          message: "something went wrong",
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
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up on running on port ${PORT}`);
});
