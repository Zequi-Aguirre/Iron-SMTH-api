const express = require("express");
const router = express.Router();
const Property = require("../models/Property.model");
const User = require("../models/User.model");
const Request = require("../models/Request.model");

// *** A Form with a post method will return the info from the form in the req.body
// *** A Form with a get method will return the info from the form in the req.query

router.get("/all", (req, res, next) => {
  Request.find()
    .populate("property")
    .then((requestsFromDb) => {
      console.log(requestsFromDb);
      res.json(requestsFromDb);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Create Route
router.post("/create", (req, res, next) => {
  console.log(req.body);
  Request.create(req.body)
    .then((newRequest) => {
      Property.findByIdAndUpdate(req.body.property, {
        $addToSet: { requests: newRequest },
      }).then((updatedProperty) => {
        console.log(updatedProperty);
        res.json(updatedProperty);
      });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/edit", (req, res, next) => {
  console.log(req.body);
  Request.findByIdAndUpdate(req.body.requestID, {
    property: req.body.property,
    description: req.body.description,
    dueDate: req.body.dueDate,
    assignedTo: req.body.assignedTo,
    status: req.body.status,
  })
    .then((updatedRequest) => {
      console.log(updatedRequest);
      res.json(updatedRequest);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/delete/:requestId", (req, res, next) => {
  console.log(req.params.requestId);
  Request.findByIdAndDelete(req.params.requestId)
    .then((deletedRequest) => {
      console.log("deletedRequest");
      console.log(deletedRequest);
      res.json(deletedRequest);
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
