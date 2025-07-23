const express = require('express');
const { query } = require('express-validator');
const locationController = require('../controllers/locationController');

const router = express.Router();

// Location validation
const coordinatesValidation = [
  query('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  query('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90')
];

// Routes
router.get('/geocode', coordinatesValidation, locationController.getCityCodeFromCoordinates);

module.exports = router;
