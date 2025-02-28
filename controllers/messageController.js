// const Message = require('../models/message');
// const nodemailer = require('nodemailer');

// const sendEmail = async (name, email, message) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.ADMIN_EMAIL,
//     subject: 'New Message from Contact Form',
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//   };

//   await transporter.sendMail(mailOptions);
// };

// const createMessage = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     // Save message in MongoDB
//     const newMessage = new Message({ name, email, message });
//     await newMessage.save();

//     // Send email notification to admin
//     await sendEmail(name, email, message);

//     res.status(201).json({ success: true, message: 'Message sent successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to send message.' });
//   }
// };

// // Get all messages
// const getMessage = async (req, res) => {
//   try {
//     const newMessage = await Message.find();
//     return res.status(200).json({
//       status: "success",
//       message: "Messages fetched successfully",
//       data: newMessage,
//     });
//   } catch (err) {
//     return res.status(400).json({ status: "failed", message: err.message });
//   }
// };

// // Delete message by ID
// const deleteOder = async (req, res) => {
//   try {
//     const newMessage = await Message.findByIdAndDelete(req.params.id);
//     if (!newMessage) throw Error("Messages not found");
//     return res.json({ message: "Message deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Get message by ID
// const getOderById = async (req, res) => {
//   try {
//     const messages = await Message.findById(req.params.id);
//     res.status(200).json({
//       status: "success",
//       message: "message fetched successfully",
//       messages,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Oops sorry , an error in fetching Messages ",
//     });
//   }
// };

// // Update message by ID
// const updateOder = async (req, res) => {
//   try {
//     const message = await Message.findById({ _id: req.params.id });
//     if (!message) {
//       return res.status(404).json({
//         status: "failed",
//         message: "message not found",
//       });
//     }
//     const updatedOder = await Message.findByIdAndUpdate(req.params.id, {
//       email: req.body.email,
//       message: req.body.message
//     }, { new: true });
//     res.status(200).json({
//       message: "message updated successfully",
//       updatedOder,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// };

// module.exports = {
//   createMessage,
//   getMessage,
//   deleteOder,
//   getOderById,
//   updateOder
// };
// const express = require('express');
// const router = express.Router();
const Message = require('../models/message');
const nodemailer = require('nodemailer');

// Email sending function
export const sendEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  await transporter.sendMail(mailOptions);
};

// Create message and send email
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save message in MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email notification to admin
    await sendEmail(name, email, message);

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};


