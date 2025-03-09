const Message = require("../models/message.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create Message Messageing
const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      email: req.body.email,
      messages: req.body.messages,
      name: req.body.name,
    });

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER, // Replace with your email
      to: process.env.ADMIN_EMAIL, // Replace with admin email
      subject: "New Message Created",
      text: `A new Message has been created.\nEmail: ${req.body.email}\nMessage: ${req.body.messages}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(200).json({
      status: "success",
      message: "Message created successfully. See you in the upcoming 4 days.",
      data: newMessage,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

// Get all Message Messageings
const getMessage = async (req, res) => {
  try {
    const Messages = await Message.find();
    return res.status(200).json({
      status: "success",
      message: "Messages fetched successfully",
      data: Messages,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

// Delete Message Messageing
const deleteMessage = async (req, res) => {
  try {
    const Messages = await Message.findByIdAndDelete(req.params.id);
    if (!Messages) throw Error("Message not found");
    return res.json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Message by ID
const getMessageById = async (req, res) => {
  try {
    const messages = await Message.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Message fetched successfully",
      messages,
    });
  } catch (error) {
    res.status(400).json({
      message: "Oops, sorry, an error occurred while fetching messages.",
    });
  }
};

// Update Message
const updateMessage = async (req, res) => {
  try {
    const message = await Message.findById({ _id: req.params.id });
    if (!message) {
      return res.status(404).json({
        status: "failed",
        message: "Message not found",
      });
    }
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.email,
        message: req.body.message,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Message updated successfully",
      updatedMessage,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessage,
  deleteMessage,
  getMessageById,
  updateMessage,
};
