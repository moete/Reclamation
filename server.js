const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const app = express();
const url = "mongodb+srv://auth:B967C73C@cluster0.bvaoo.mongodb.net/AUTH?retryWrites=true&w=majority"
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

const db = require("./app/models");
const Status = require("./app/models/status.model");
const Role = db.role;


db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    initialStatus();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

function initialStatus() {

  Status.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Status({
        type : "Broken"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Broken' to status  collection");
      });

      new Status ({
        type : "InProgress"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'InProgress' to status collection");
      });

      new Status ({
        type : "Fixed"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Fixed' to status collection");
      });
    }
  });
}