const db = require("../models");
const Contact = db.contacts;
// Create and Save a new contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a contact
  const contact = new Contact({
    source: req.body.source, 
    name: req.body.name,
    first: req.body.firstname,
    last: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    service: req.body.service,
    message: req.body.message
  });
  // Save demo in the database
  contact
    .save(contact)
    .then(data => {
      res.status(200).send({message: "Request Received"});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the demo."
      });
    });
};