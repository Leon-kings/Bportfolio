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
