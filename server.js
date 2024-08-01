const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
const sequelizeConfig = require('./config/config');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];

console.log('Config:', config); // Debugging line

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});