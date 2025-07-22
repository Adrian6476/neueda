const axios = require('axios');
require('dotenv').config();

class LocationService {
  constructor() {
    this.amapKey = process.env.AMAP_API_KEY;
  }

  // Convert GPS coordinates to Amap coordinates (GCJ-02)
  async convertCoordinates(longitude, latitude) {
    try {
      const response = await axios.get('https://restapi.amap.com/v3/assistant/coordinate/convert', {
        params: {
          locations: `${longitude},${latitude}`,
          coordsys: 'gps', // GPS coordinates (WGS84)
          output: 'JSON',
          key: this.amapKey
        }
      });

      if (response.data.status === '1' && response.data.locations) {
        const [convertedLon, convertedLat] = response.data.locations.split(',');
        return { longitude: parseFloat(convertedLon), latitude: parseFloat(convertedLat) };
      }
      throw new Error('坐标转换失败');
    } catch (error) {
      console.error('Coordinate conversion error:', error);
      // If conversion fails, try using original coordinates
      return { longitude: parseFloat(longitude), latitude: parseFloat(latitude) };
    }
  }

  // Get city code (adcode) from coordinates using reverse geocoding
  async getCityCodeFromCoordinates(longitude, latitude) {
    try {
      // First convert coordinates if needed
      const converted = await this.convertCoordinates(longitude, latitude);
      
      const response = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          location: `${converted.longitude},${converted.latitude}`,
          output: 'JSON',
          key: this.amapKey,
          radius: 1000,
          extensions: 'base'
        }
      });

      if (response.data.status === '1' && response.data.regeocode) {
        const addressComponent = response.data.regeocode.addressComponent;
        const adcode = addressComponent.adcode;
        const city = addressComponent.city || addressComponent.district;
        const province = addressComponent.province;
        
        return {
          adcode: adcode,
          city: city,
          province: province,
          formattedAddress: response.data.regeocode.formatted_address
        };
      }
      throw new Error('无法获取位置信息');
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw new Error(`位置解析失败: ${error.message}`);
    }
  }
}

module.exports = new LocationService();
