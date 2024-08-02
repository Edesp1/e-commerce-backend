const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>");
});

module.exports = router;
// const router = require('express').Router();
// const apiRoutes = require('./api');

// // API Routes
// router.use('/api', apiRoutes);

// // Static Routes
// router.get('/', (req, res) => {
//   console.log('Home route accessed'); // Debugging line
//   res.send('<h1>Home Page</h1>');
// });

// router.get('/about', (req, res) => {
//   console.log('About route accessed'); // Debugging line
//   res.send('<h1>About Page</h1>');
// });

// // Catch-All Route
// router.use((req, res) => {
//   console.log('Unknown route accessed:', req.originalUrl); // Debugging line
//   res.send("<h1>Wrong Route!</h1>");
// });

// module.exports = router;