require('dotenv').config(); // Load environment variables from .env file

console.log('DB_USERNAME:', process.env.DB_USERNAME); // Add this line to check if the variables are loaded

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`, // You might want to use a different database for testing
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_production`, // Use a different database for production
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};