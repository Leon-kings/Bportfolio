const Book = require("../models/message.js");
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

// Create Order booking
const createOrder = async (req, res) => {
  try {
    const newBooking = await Book.create({
      email: req.body.email,
      message: req.body.message,
      name: req.body.name,
    });

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER, // Replace with your email
      to: process.env.ADMIN_EMAIL, // Replace with admin email
      subject: "New Message Created",
      text: `A new Message has been created.\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
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
      data: newBooking,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

// Get all Order bookings
const getOrder = async (req, res) => {
  try {
    const booking = await Book.find();
    return res.status(200).json({
      status: "success",
      message: "Messages fetched successfully",
      data: booking,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

// Delete Order booking
const deleteOrder = async (req, res) => {
  try {
    const booking = await Book.findByIdAndDelete(req.params.id);
    if (!booking) throw Error("Message not found");
    return res.json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const messages = await Book.findById(req.params.id);
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

// Update Order
const updateOrder = async (req, res) => {
  try {
    const message = await Book.findById({ _id: req.params.id });
    if (!message) {
      return res.status(404).json({
        status: "failed",
        message: "Message not found",
      });
    }
    const updatedOrder = await Book.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.email,
        message: req.body.message,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Message updated successfully",
      updatedOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
};
