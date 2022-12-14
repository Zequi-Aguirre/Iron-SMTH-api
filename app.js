// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

app.use(
  session({
    secret: "123secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
    }, // ADDED code below !!!
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/expressApp",
    }),
  })
);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

let whitelist = ["http://localhost:5005", "http://localhost:3000"];
let corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
app.use("/auth", require("./routes/authroutes"));
app.use("/property", require("./routes/property.routes"));
app.use("/request", require("./routes/request.routes"));
app.use("/user", require("./routes/user.routes"));

// ============== ROUTES =====================

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
