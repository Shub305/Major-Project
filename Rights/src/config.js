const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Rights");

//check database connected or not
connect.then(() => {
    console.log("Database connected");
})
.catch(() => {
    console.log("Database cannot be connected");
});


//create a schema
const loginschema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

//collection part
const collection = new mongoose.model("Project", loginschema);

module.exports = collection;

