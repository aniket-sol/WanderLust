const express = require('express');
const app = express();
const session = require("express-session");
const flash = require('connect-flash');

const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    req.flash("success", "user registered successfully");
    res.redirect("/greet");
})
app.get("/greet", (req, res) => {
    res.send(`Hello, ${req.session.name}`);
})

app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`you sent req ${req.session.count} times`);
})

app.get("/", (req, res) => {
    res.send("Home route");
})

app.listen(3000, () => {
    console.log('app is listening at port 3000');
})