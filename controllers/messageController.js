// controllers/messageController.js
import Message from '../models/message.js';
import nodemailer from 'nodemailer';

const sendEmail = async (name, email, message) => {
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
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};
// get all user to one/ To fetch one of the messages saved in the database
export const getMessage = async (req, res) => {
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

// delete Order messages saved here on database api 

export const deleteOder = async (req, res) => {
  try {
    const booking = await Book.findByIdAndDelete(req.params.id);
    if (!booking) throw Error("Messages not found");
    return res.json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get messages by ID from Database
export const getOderById = async (req, res) => {
  try {
    const messages = await Book.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "message fetched successfully",
      messages,
    });
  } catch (error) {
    res.status(400).json({
      message: "Oops sorry , an error in fetching Messages ",
    });
  }
};
// Update messages written by client
export const updateOder = async (req, res) => {
  try {
    const message = await Book.findById({ _id: req.params.id });
    if (!message) {
      return res.status(404).json({
        status: "failed",
        message: "message not found",
      });
    }
    const updatedOder = await Book.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      message: req.body.message
    });
    res.status(200).json({
      message: "message updated successfully",
      updatedOder,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};