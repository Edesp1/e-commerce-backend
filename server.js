const express = require('express');
const { Sequelize } = require('sequelize');
const sequelizeConfig = require('./config/config');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env] || {};

console.log('sequelizeConfig:', sequelizeConfig);
console.log('env:', env);
console.log('Config:', config);

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
    logging: console.log,
  }
);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import route files
const categoryRoutes = require('./routes/api/category-routes');
const productRoutes = require('./routes/api/product-routes');
const tagRoutes = require('./routes/api/tag-routes');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tags', tagRoutes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});