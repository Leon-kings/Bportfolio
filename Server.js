const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Message = require('./routes/messageRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Database connection
mongoose
  .connect(process.env.DB)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Welcome to my API' });
});

app.use('/messages', Message);

// Start the server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;
