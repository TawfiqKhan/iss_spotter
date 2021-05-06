const request = require("request");
const ipifyAPI = 'https://api.ipify.org/?format=json';

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

module.exports = { fetchMyIp };