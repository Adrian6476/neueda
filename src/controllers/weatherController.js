const { validationResult } = require('express-validator');
const weatherService = require('../services/weatherService');
const { pool } = require('../config/database');

class WeatherController {
  async getCurrentWeather(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { city } = req.query;

      // Get weather data
      const weatherData = await weatherService.getCurrentWeather(city);

      // Log the query if user is authenticated
      if (req.user) {
        try {
          await pool.execute(
            'INSERT INTO weather_queries (user_id, city) VALUES (?, ?)',
            [req.user.userId, city]
          );
        } catch (logError) {
          console.error('Error logging weather query:', logError);
        }
      }

      res.json(weatherData);
    } catch (error) {
      console.error('Weather query error:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch weather data' });
    }
  }

  async getWeatherForecast(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { city } = req.query;

      // Get forecast data
      const forecastData = await weatherService.getWeatherForecast(city);

      // Log the query if user is authenticated
      if (req.user) {
        try {
          await pool.execute(
            'INSERT INTO weather_queries (user_id, city) VALUES (?, ?)',
            [req.user.userId, city]
          );
        } catch (logError) {
          console.error('Error logging weather query:', logError);
        }
      }

      res.json(forecastData);
    } catch (error) {
      console.error('Weather forecast error:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch weather forecast' });
    }
  }

  async getQueryHistory(req, res) {
    try {
      const [rows] = await pool.execute(`
        SELECT city, query_time 
        FROM weather_queries 
        WHERE user_id = ? 
        ORDER BY query_time DESC 
        LIMIT 50
      `, [req.user.userId]);

      res.json({ queries: rows });
    } catch (error) {
      console.error('Query history error:', error);
      res.status(500).json({ error: 'Failed to fetch query history' });
    }
  }
}

module.exports = new WeatherController();
