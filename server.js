const express = require('express');
const routes = require('./routes'); // Correct path to your routes
const { Sequelize } = require('sequelize');
const sequelizeConfig = require('./config/config');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env] || {}; // Ensure config is not undefined

console.log('sequelizeConfig:', sequelizeConfig); // Debugging line
console.log('env:', env); // Debugging line
console.log('Config:', config); // Debugging line

if (!config.database || !config.username || !config.password || !config.host || !config.dialect) {
  console.error('Missing configuration properties.');
  process.exit(1);
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: console.log, // Enable logging
  }
);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files if needed

// Route setup
app.use('/', routes); // Ensure your routes are correctly registered

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});