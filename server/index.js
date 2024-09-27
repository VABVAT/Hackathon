// ! importing dependencies
require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {z} = require("zod");
const cors = require("cors");
const bcrypt = require("bcrypt");
const {userModel} = require("./models/users")
const {statusModel} = require("./models/applications")
const {PCCInformation} = require("./routes/PCCInformation");
const {PCCStatus} = require("./routes/PCCStatus")
app.use(express.json());
app.use(cors());
// console.log("hey")

mongoose.connect(process.env.MONGO_CONNECTION)


//! auth 1 mekes sure its their first time 





app.get("/", (req, res)=> {
    res.send("welcome")
})

//! end point for new applications 
app.use("/PCCInformation", PCCInformation);

//! end point for viewing status of application

app.use("/PCCStatus",  PCCStatus);

//! end point for admin dashboard


app.listen(3000)