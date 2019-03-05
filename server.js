const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path")

const users = require("./routes/api/users")
const posts = require("./routes/api/posts")
const profile = require("./routes/api/profile")

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport)

//Use Routes
app.use("/api/users", users)
app.use("/api/posts", posts)
app.use("/api/profile", profile)

//Server Static asset if in production
if(process.env.NODE_ENV === "production"){
    //Set static folder
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`))