const route = require("express").Router();
const ldata = require("../models/schema");
const data = require("../models/schema");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");  // Import bcrypt library
var db = mongoose.collection;

route.get("/login", (req, res) => {
    res.redirect("login.html");
});

route.get("/signup", (req, res) => {
    res.redirect("signup.html");
});

route.post("/sig", (req, res) => {
    const log = new data(req.body);
    log.save().then(() => {
        res.redirect("/login");
    }).catch(err => {
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
});

route.post("/log", (req, res) => {
    const user = req.body.email;
    const password = req.body.password;

    ldata.findOne({ email: user }).then((result) => {
        if (result === null) {
            console.log("User not found");
            res.redirect("/login");
        } else {
            // Use bcrypt.compare to compare the entered password with the hashed password from the database
            bcrypt.compare(password, result.password, (err, passwordMatch) => {
                if (passwordMatch) {
                    res.redirect("success.html");
                } else {
                    console.log("Wrong password");
                    res.redirect("/login");
                }
            }); 
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
});

module.exports = route;
