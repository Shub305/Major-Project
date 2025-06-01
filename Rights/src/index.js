const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const { name } = require("ejs");

const app = express();
//convert data inot json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use EJS as the view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("login");
});

app.get("/signup", (req,res) => {
    res.render("signup");
});

app.get("/home", (req, res) => {
    res.render("home");
});
// Catch-all route
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});



//Resgister user 
app.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = await LoginSchema.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
        });

        console.log(userData);

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`server running at port: ${port}`);
});