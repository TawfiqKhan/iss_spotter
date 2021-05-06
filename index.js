const { fetchMyIp } = require('./iss')

fetchMyIp((err, data) => {
  if (err) {
    console.log("Failed to get Data: ", err)
    return;
  }
  console.log("your IP is: ", data)
})