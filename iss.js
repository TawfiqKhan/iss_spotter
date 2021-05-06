const request = require("request");
const ipifyAPI = 'https://api.ipify.org/?format=json';
const freeGeoipAPI = 'https://freegeoip.app/json/';

const fetchMyIp = function(callback) {
  request(ipifyAPI, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`${freeGeoipAPI}${ip}`, (error, response, body)=> {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
};

module.exports = { fetchMyIp, fetchCoordsByIp };