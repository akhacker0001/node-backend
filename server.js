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
        email: process.env.SUPER_ADMIN_EMAIL
      }
    })
    if (!superAdminUser) {
      db.Admin.create({
        isSuperAdmin: true,
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASS,
        firstName: "naval",
        lastName: "sood",
        isAdmin: false,
        activeStatus: true,
        inviteStatus: "Joined"
      })
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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



app.use(globalError)


app.all('*', (req, res, next) => {

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})


