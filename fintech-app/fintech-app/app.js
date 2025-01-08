const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});