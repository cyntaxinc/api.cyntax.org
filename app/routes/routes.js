module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
    var router = require("express").Router();
    
    router.post("/cyntaxcloud", contacts.create);
    router.post("/cyntaxorg", contacts.create);
    router.post("/caldwellfence", contacts.create);
    router.post("/olivergrading", contacts.create);
    router.post("/ganonlabs", contacts.create);
    router.post("/trustchurch", contacts.create);
    router.post("/linvestus", contacts.create);
    router.post("/b3poio", contacts.create);
    
    app.use('/api', router);
};
