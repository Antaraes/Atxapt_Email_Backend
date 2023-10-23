const userModel = require("../models/user");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const emailValidator = require("deep-email-validator");

const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
};

const send = (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

async function isEmailValid(email) {
  try {
    const { valid, reason, validators } = await emailValidator.validate(email);
    return { valid, reason, validators };
  } catch (error) {
    // Handle validation errors
    return { valid: false, reason: "timeout", validators: {} };
  }
}

exports.createUser = async (req, res) => {
  console.log(req.body);
  const { email, datas } = req.body;
  if (!email || !datas) {
    return res.status(400).send({
      message: "Data missing",
    });
  }
  const { valid, reason, validators } = await emailValidator.validate(email);
  const data = {
    from: "minbhonethantajm@gmail.com",
    to: email,
    subject: "Thank you",
    text: `Dear customer,\n\nThank you for choosing our apartment retailer services. We appreciate your trust in us and look forward to assisting you in finding the perfect apartment. If you have any questions or need further assistance, please don't hesitate to reach out. We're here to help!\n\nSincerely, Atxapt`,
  };
  if (valid) {
    const emailSender = await send(data);
    userModel
      .create({
        email: email,
        datas: datas,
      })
      .then(() => {
        res.json({ msg: "Successfully created", emailSender });
      })
      .catch((err) => console.log(err));
  } else {
    return res.status(400).send({
      message: "Please provide a valid email address.",
      reason: validators[reason].reason,
    });
  }
};
