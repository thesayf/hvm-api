require('dotenv').config()
const express = require("express");
const app = express();
const fetch = require("node-fetch");
var axios = require("axios").default;
const fs = require("fs");
const _ = require("underscore");
const mongoose = require("mongoose")
const db = mongoose.connection;
// const cities = require("./cities.json")
const cityFactory = require("./factories/cityFactory")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const City = require("./models/City")

const cities = ["London", "New York", "Chicago", "Leicester", "Manchester"];



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "options") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.send("HVM APP");
});

// const cities = ["London", "New York", "Chicago", "Leicester", "Manchester"];

// app.get("/cities", (req, res) => {
//   let i = 0;

//   let timeHasrun = setInterval(() => {
//     fetch(
//       `https://www.numbeo.com/api/city_prices?api_key=1dap9z2dq3eguv&query=${cities[i]}`
//     )
//       .then((res) => res.json())
//       .then((body) => {
//         console.log(body);
//         i++;
//         if (i === 4) {
//           clearInterval(timeHasrun);
//         }
//       });
//   }, 3000);
// });

// app.get('/', (req, res) =>  {
//     res.send('HVM APP')
// })

// const cities = ['London', 'New York', 'Chicago', 'Leicester', 'Manchester']

// app.get('/cities', (req, res) => {

//   let i = 0

//  let timeHasrun = setInterval(() => {
//     fetch(`https://www.numbeo.com/api/city_prices?api_key=1dap9z2dq3eguv&query=${cities[i]}`)
//           .then(res => res.json())
//           .then((body) => {
//             console.log(body)
//             i++
//             if(i === 4 ){
//                   clearInterval(timeHasrun)
//               }
//           })
//   }, 3000)
  
// } )
// comment
app.post("/createCity", jsonParser, (req, res) => {
  const city = cityFactory(req.body)
  city.save().then((state) => console.log(state))
})

app.get("/cities", (req, res) => {
  let i = 0;

  let timeHasrun = setInterval(() => {
    fetch(
      `https://www.numbeo.com/api/city_prices?api_key=${process.env.NUMBEO_API_KEY}&query=${cities[i].name}`
    )
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        i++;
        if (i === 4) {
          clearInterval(timeHasrun);
        }
      });
  }, 3000);
});


// cities.forEach((city, i) => {
//   setTimeout(() => {
//     fetch(`https://www.numbeo.com/api/city_prices?api_key=1dap9z2dq3eguv&query=${city}`)
//       .then(res => res.json())
//       .then((body) => {
//       console.log(body)
//       })
//       .catch((error) => console.log(error))
//   }, i * 1000)

// })

// var timesRun = 0;
// var interval = setInterval(function(){
//     timesRun ++
//     if(timesRun === 5){
//         clearInterval(interval);
//     }
//     console.log('this has run')
// }, 2000);

// let timeHasrun = setInterval(() => {
//   // fetch(`https://www.numbeo.com/api/city_prices?api_key=1dap9z2dq3eguv&query=${cities[i]}`)
//   //       .then(res => res.json())
//   //       .then((body) => {
//   //       console.log(body)
//   //       if(i < 4 ){
//   //         i++
//   //         console.log(i)
//   //       }
//   //       })
//   i++
//   console.log(i)
//   console.log('this ran')
//   if(i === 4 ){
//         clearInterval(timeHasrun)
//     }
// }, 3000)

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("were connected to DB");
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_USER_NAME}@cluster0-mawms.mongodb.net/${process.env.MONGO_DB_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const port = process.env.PORT || "3000";
app.listen(port, () => console.log("waiting on port 3000"));
