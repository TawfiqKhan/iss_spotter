const { fetchMyIp, fetchCoordsByIp, fetchIssCords } = require('./iss')

// fetchMyIp((err, data) => {
//   if (err) {
//     console.log("Failed to get Data: ", err)
//     return;
//   }
//   console.log("your IP is: ", data)
// })

// fetchCoordsByIp("76.69.79.165", (err, data)=> {
//   if (err) {
//     console.log("Failed to get Data: ", err)
//     return;
//   }
//   console.log("your cords are: ", data)
// })
let coords = { latitude: 43.6089, longitude: -79.5003 }
fetchIssCords(coords, (err, data)=> {
  if (err) {
    console.log("Failed to get Data: ", err)
    return;
  }
  console.log("your cords are: ", data)
})