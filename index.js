require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// MongoDB connection
const getconnect = require("./dbconnect");

// ===============================
// MIDDLEWARE
// ===============================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "arya_secret_key",
        resave: false,
        saveUninitialized: false
    })
);

// Make logged-in user available in all EJS pages
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Static files
const publicpath = path.join(__dirname, "public");
app.use(express.static(publicpath));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.render("home/home");
});

app.get("/home", (req, res) => {
    res.render("home/home");
});


// ===============================
// LOGIN
// ===============================

app.get("/login", (req, res) => {
    res.render("login/login");
});


app.post("/loginres", async (req, res) => {
    try {

        if (req.body.b1 == null) {
            return res.render("login/login");
        }

        const gusername = req.body.t1;
        const gpassword = req.body.t2;


        // ===============================
        // ADMIN LOGIN
        // ===============================

        if (gusername === "admin" && gpassword === "admin") {

            const db = await getconnect();

            const collection = db.collection("farmers");

            const records = await collection.find({}).toArray();

            return res.render("admin/adminhome", {
                records
            });
        }


        // ===============================
        // NORMAL USER LOGIN
        // ===============================

        const db = await getconnect();

        const collection = db.collection("admin1");

        const user = await collection.findOne({
            username: gusername,
            password: gpassword
        });


        if (user) {

            req.session.user = {
                id: user._id,
                name: user.username,
                username: user.username
            };

            console.log("Login Successful");

            return res.render("home/home", {
                user: req.session.user
            });

        } else {

            return res.render("login/invalid");
        }

    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).send("Internal Server Error");
    }
});


// ===============================
// FORGOT PASSWORD
// ===============================

app.get("/forgotpassword", (req, res) => {
    res.render("login/forgotpassword");
});


app.post("/forgotpasswords", async (req, res) => {

    try {

        const db = await getconnect();

        const collection = db.collection("admin1");

        const username = req.body.username;
        const password = req.body.password;


        // findOne instead of find
        const user = await collection.findOne({
            username: username
        });


        if (user) {

            await collection.updateOne(
                {
                    username: username
                },
                {
                    $set: {
                        password: password
                    }
                }
            );

            res.send(`
                <script>
                    alert("Password Updated Successfully");
                    window.location="/login";
                </script>
            `);

        } else {

            res.send(`
                <script>
                    alert("Username Not Found");
                    window.location="/forgotpassword";
                </script>
            `);
        }

    } catch (error) {

        console.error("Forgot Password Error:", error);

        res.status(500).send("Internal Server Error");
    }
});


// ===============================
// CONTACT
// ===============================

app.get("/contact", (req, res) => {
    res.render("home/contact");
});


app.post("/contacts", async (req, res) => {

    try {

        const gname = req.body.name;
        const gemail = req.body.email;
        const gsubject = req.body.subject;
        const gmsg = req.body.message;


        const db = await getconnect();

        const collection = db.collection("farmers");


        const records = await collection.insertOne({
            name: gname,
            email: gemail,
            subject: gsubject,
            message: gmsg
        });


        if (records.acknowledged === true) {

            console.log("Record inserted");

            return res.render("home/home");

        } else {

            console.log("Record not inserted");

            return res.status(500).send("Record not inserted");
        }

    } catch (error) {

        console.error("Contact Error:", error);

        res.status(500).send("Internal Server Error");
    }
});


// ===============================
// ABOUT
// ===============================

app.get("/about", (req, res) => {
    res.render("home/about");
});


// ===============================
// PRODUCT
// ===============================

app.get("/product", (req, res) => {
    res.render("home/product");
});


// ===============================
// SERVICES
// ===============================

app.get("/services", (req, res) => {
    res.render("home/services");
});


// ===============================
// NEWS
// ===============================

app.get("/news", (req, res) => {
    res.render("home/news");
});


// ===============================
// REGISTER
// ===============================

app.get("/register", (req, res) => {
    res.render("login/register");
});


app.post("/registers", async (req, res) => {

    try {

        const gfirstname = req.body.firstname;
        const glastname = req.body.lastname;
        const gemail = req.body.email;
        const gMobileNumber = req.body.mobile;
        const gusername = req.body.username;
        const gpassword = req.body.password;
        const gconfirmpassword = req.body.confirmpassword;
        const grole = req.body.role;


        // Check password
        if (gpassword !== gconfirmpassword) {

            return res.render("login/register", {
                msg: "Password and Confirm Password are not same"
            });
        }


        const db = await getconnect();

        const collection = db.collection("admin1");


        // Check existing username
        const existingUser = await collection.findOne({
            username: gusername
        });


        if (existingUser) {

            return res.render("login/register", {
                msg: "Username already exists"
            });
        }


        // Insert user
        const records = await collection.insertOne({

            firstname: gfirstname,

            lastname: glastname,

            email: gemail,

            mobile: gMobileNumber,

            username: gusername,

            role: grole,

            password: gpassword
        });


        if (records.acknowledged === true) {

            console.log("Record inserted");

            return res.render("login/login");

        } else {

            console.log("Record not inserted");

            return res.status(500).send("Registration failed");
        }

    } catch (error) {

        console.error("Registration Error:", error);

        res.status(500).send("Internal Server Error");
    }
});


// ===============================
// CART
// ===============================

app.get("/cart", (req, res) => {

    const cart = [];

    res.render("home/cart", {
        cart
    });
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 3000;


// Connect MongoDB first, then start server
const startServer = async () => {

    try {

        await getconnect();

        app.listen(PORT, "0.0.0.0", () => {

            console.log(`Server running on port ${PORT}`);

        });

    } catch (error) {

        console.error("Server startup error:", error);

    }
};


startServer();