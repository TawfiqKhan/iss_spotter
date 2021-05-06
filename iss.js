const request = require("request");
const ipifyAPI = 'https://api.ipify.org/?format=json';
const freeGeoipAPI = 'https://freegeoip.app/json/';
const openNotifyAPI = 'http://api.open-notify.org/iss-pass.json?';

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
  request(`${freeGeoipAPI}${ip}`, (error, response, body) => {
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
    callback(null, { latitude, longitude });
  });
};

const fetchIssCords = function(coords, callback) {
  request(`${openNotifyAPI}lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    // console.log(data);
    callback(null, passes);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((err, ip) => {
    if (err) {
      return callback(err, null);
    }
    fetchCoordsByIp(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }
      fetchIssCords(coords, (err, passes) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, passes);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };