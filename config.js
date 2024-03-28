const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoUri: process.env.MONGODB_URI,
  port: process.env.PORT,
};
