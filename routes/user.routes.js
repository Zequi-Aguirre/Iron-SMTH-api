const express = require("express");
const router = express.Router();
const Property = require("../models/Property.model");
const User = require("../models/User.model");
const Request = require("../models/Request.model");

// *** A Form with a post method will return the info from the form in the req.body
// *** A Form with a get method will return the info from the form in the req.query

router.get("/all", (req, res, next) => {
  User.find()
    .then((usersFromDb) => {
      console.log(usersFromDb);
      res.json(usersFromDb);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Create Route
router.post("/create", (req, res, next) => {
  console.log(req.body);
  Property.create(req.body).then((newProperty) => {
    console.log(newProperty);
  });
});

router.post("/delete/:userId", (req, res, next) => {
  console.log(req.params.userId);
  User.findByIdAndDelete(req.params.userId)
    .then((deletedUser) => {
      console.log("deletedUser");
      console.log(deletedUser);
      res.json(deletedUser);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// *** The only way to get a value from req.params is if you personally set a variable using the :variableName method in the endpoint when creating your route. You then call the value for that parameter by using req.params.variableName
router.get("/:animalId", (req, res, next) => {});

router.post("/update/:id", (req, res, next) => {});

module.exports = router;
