const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const data = require("./models/schema");
const route  = require("./routes/route");

app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

const mongo = "mongodb+srv://Harish:harish@cluster0.sb4ratg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
    console.log("DB connected");
    app.listen(7000, () => {
        console.log("Server is listening on port 7000");
    })
}).catch(err => console.log(err));

app.use(route);

app.get("/", (req,res) => {
    return res.redirect("signup.html");
})
