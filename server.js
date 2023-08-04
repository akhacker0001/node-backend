const express = require('express');
const { connectToMongo } = require('./config/db');
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8000;
const AppError = require("./utils/appError")
const globalError = require("./controller/errorController")
const db = require("./model");

const data = require("./data.json")

// connectToMongo()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors())
app.use(express.json());


db.sequelize.sync()
  .then(async () => {
    let superAdminUser = await db.Admin.findOne({
      where: {
        email: process.env.ADMIN_EMAIL
      }
    })
    if (!superAdminUser) {
      db.Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: process.env.ADMIN_NAME,
      })
      db.Color.bulkCreate(data.colors)
    }
    // db.City.bulkCreate(data.city)
    // db.State.bulkCreate(data.state)

    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/admin",require("./routes/admin"));
// app.use('/api/v1/media', express.static(process.env.FILE_LOCATION))
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



app.use(globalError)


app.all('*', (req, res, next) => {

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})


