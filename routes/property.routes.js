const express = require("express");
const router = express.Router();
const Property = require("../models/Property.model");
const User = require("../models/User.model");
const Request = require("../models/Request.model");

// *** A Form with a post method will return the info from the form in the req.body
// *** A Form with a get method will return the info from the form in the req.query

router.get("/all", (req, res, next) => {
  Property.find()
    .then((propertiesFromDb) => {
      // console.log(propertiesFromDb);
      // res.json({ prop: propertiesFromDb, name: "test" });
      res.json(propertiesFromDb);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Create Route
router.post("/create", (req, res, next) => {
  console.log("req.body");
  console.log(req.body);
  Property.create(req.body)
    .then((newProperty) => {
      console.log(newProperty);
      res.json(newProperty);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/delete/:propertyId", (req, res, next) => {
  console.log(req.params.propertyId);

  Request.deleteMany({ property: req.params.propertyId })
    .then((deletedRequests) => {
      console.log(deletedRequests);
      Property.findByIdAndDelete(req.params.propertyId).then(
        (deletedProperty) => {
          console.log("deletedProperty");
          console.log(deletedProperty);
          res.json(deletedProperty);
        }
      );
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
