const express = require('express');
const { query } = require('express-validator');
const weatherController = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Weather query validation
const weatherValidation = [
  query('city')
    .notEmpty()
    .withMessage('City parameter is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('City code must be between 1 and 20 characters')
];

// Optional authentication middleware - allows both authenticated and anonymous users
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(); // Continue without authentication
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err) {
      req.user = user;
    }
    next();
  });
};

// Routes
router.get('/current', weatherValidation, optionalAuth, weatherController.getCurrentWeather);
router.get('/forecast', weatherValidation, optionalAuth, weatherController.getWeatherForecast);
router.get('/history', authenticateToken, weatherController.getQueryHistory);

module.exports = router;
