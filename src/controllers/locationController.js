const { validationResult } = require('express-validator');
const locationService = require('../services/locationService');

class LocationController {
  async getCityCodeFromCoordinates(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { longitude, latitude } = req.query;

      // Validate coordinates
      const lon = parseFloat(longitude);
      const lat = parseFloat(latitude);

      if (isNaN(lon) || isNaN(lat)) {
        return res.status(400).json({ error: '无效的坐标格式' });
      }

      if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
        return res.status(400).json({ error: '坐标超出有效范围' });
      }

      const locationInfo = await locationService.getCityCodeFromCoordinates(lon, lat);

      res.json({
        success: true,
        data: locationInfo
      });
    } catch (error) {
      console.error('Location controller error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message || '位置服务错误' 
      });
    }
  }
}

module.exports = new LocationController();
