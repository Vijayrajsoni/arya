require("dotenv").config();
const express = require("express")
const app=express()
const path=require("path")
const session = require("express-session");
app.use(session({
    secret: "arya_secret_key",
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
const publicpath=path.join(__dirname,'public')
app.use(express.static(publicpath));
const getconnect=require("./dbconnect");
getconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get("/login", (req, res) => {
res.render("login/login");

});
app.post("/loginres", async (req, res) => {

    if (req.body.b1 == null) {
        return res.render("login/login");
    }

    let gusername = req.body.t1;
    let gpassword = req.body.t2;

    if (gusername === "admin" && gpassword === "admin") {

        let db = await getconnect();
        let collection = db.collection("farmers");
        

        let records = await collection.find({}).toArray();

        return res.render("admin/adminhome", { records });
    }
    let db = await getconnect();
    let collection = db.collection("admin1");

    let user = await collection.findOne({
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
        return res.render("home/home", { user: req.session.user });

    } else {

      return res.render("login/invalid");

    }

});

app.get("/forgotpassword", (req, res) => {
    res.render("login/forgotpassword");
});
app.post("/forgotpasswords", async (req, res) => {

    let db = await getconnect();
    let collection = db.collection("admin1");

    let username = req.body.username;
    let password = req.body.password;

    let user = await collection.find({ username: username });

    if (user) {

        await collection.updateOne(
            { username: username },
            { $set: { password: password } }
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

});

app.get("/contact",(req,res)=>{
    res.render("home/contact")
})
app.post("/contacts",async(req,res)=>{
        const gname = req.body.name;
        const gemail = req.body.email;
        const gsubject = req.body.subject;
        const gmsg = req.body.message;
       let db= await getconnect();    
       let collection=db.collection("farmers");
let records=await collection.insertOne({name:gname,email:gemail,subject:gsubject,message:gmsg})
if(records.acknowledged==true){
    res.render("home/home")
        console.log("rocord inserted")
}
    else
        console.log("record not inserted")

 })
 app.get("/about",(req,res)=>{
    res.render("home/about")
 })
 app.get("/product",(req,res)=>{
    res.render("home/product")
 })
 app.get("/services",(req,res)=>{
    res.render("home/services")
 })
 app.get("/home",(req,res)=>{
    res.render("home/home")
 })
 app.get("/news",(req,res)=>{
    res.render("home/news")
 })
app.get("/register",(req,res)=>{
    res.render("login/register")
})
app.get("/cart", (req, res) => {
    let cart = []; 
    res.render("home/cart", { cart });
});

app.post("/registers",async(req,res)=>{
     const gfirstname = req.body.firstname;
     const glastname = req.body.lastname;
        const gemail = req.body.email;
        const gMobileNumber = req.body.mobile;
        const gusername = req.body.username;
         const gpassword = req.body.password;
         const gconfirmpassword = req.body.confirmpassword;
         const grole = req.body.role;
        if (gpassword != gconfirmpassword) {
            res.render("login/register", { msg: "Password and Confirm Password are not same" });
            return;
        }
        else{
       let db= await getconnect();    
       let collection=db.collection("admin1");
    let records=await collection.insertOne({firstname:gfirstname,lastname:glastname,email:gemail,mobile:gMobileNumber,username:gusername,role:grole,password:gpassword})
     if(records.acknowledged==true){
    res.render("login/login")
        console.log("rocord inserted")
}
    else
        console.log("record not inserted")
}

 })
 

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
