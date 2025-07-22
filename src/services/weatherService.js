const axios = require('axios');
require('dotenv').config();

class WeatherService {
  constructor() {
    this.baseURL = 'https://restapi.amap.com';
    this.apiKey = process.env.AMAP_API_KEY;
  }

  async getWeatherInfo(city, extensions = 'base') {
    try {
      const response = await axios.get(`${this.baseURL}/v3/weather/weatherInfo`, {
        params: {
          city: city,
          extensions: extensions,
          output: 'JSON',
          key: this.apiKey
        }
      });

      if (response.data.status !== '1') {
        throw new Error(response.data.info || 'Weather API error');
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Weather API error: ${error.response.data.info || error.response.statusText}`);
      }
      throw new Error(`Network error: ${error.message}`);
    }
  }

  async getCurrentWeather(city) {
    return await this.getWeatherInfo(city, 'base');
  }

  async getWeatherForecast(city) {
    return await this.getWeatherInfo(city, 'all');
  }
}

module.exports = new WeatherService();
