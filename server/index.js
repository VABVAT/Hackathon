// ! importing dependencies
require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {z} = require("zod");
const cors = require("cors");
const bcrypt = require("bcrypt");
const {userModel} = require("../models/users")
const {statusModel} = require("../models/applications")

app.use(express.json());
app.use(cors());
// console.log("hey")

mongoose.connect(process.env.MONGO_CONNECTION)

// app.get("/", (req, res)=>{
//     res.send("hello world")
// })

//! auth 1 mekes sure its their first time 

async function auth_1(req, res, next){
    if(req.body.adhaarNumber){
        const user = await  userModel.findOne({adhaarNumber: req.body.adhaarNumber})
        if(user){
            res.status(402).json({error: "kindly view your status"})
        }else{
            next();
        }
        
    }else{
        next();
    }
}

async  function auth_2(req, res, next){
    // console.log(req.body.token)
    const status_report = await statusModel.findOne({
        user_id:req.body.token
    })
    if(status_report){
        req.body.state = status_report.status;
        next();
    }else{
        res.status(402).json({error: "Create new application"})
    }
}

app.get("/api", (req, res)=> {
    res.send("welcome")
})

//! end point for new applications 
app.post("/api/PCCInformation", auth_1 ,async (req, res) =>{
    // console.log(req.body.name);

    const required_body = z.object({
        name :  z.string().min(1),
        password: z.string().min(6, {message : "password needs to be longer than 6 words"}).max(100, {message: "reduce password size"}),
        age : z.number().min(0),
        gender : z.string().min(1),
        DOB : z.string().min(10).max(10),
        adhaarNumber : z.string().min(12).max(12),
        address : z.string().min(1),
        city : z.string().min(1),
        state :  z.string().min(1)
    })
    //! i can add some checks for duplicity here
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password, 2);
    const age = parseInt(req.body.age);
    const gender = req.body.gender;
    const DOB = req.body.dob;
    const adhaarNumber = req.body.adhaarNumber;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state
    //! image issue to be taken care of
    //! put in database
    const data =  required_body.safeParse({name, password, age, gender, DOB, adhaarNumber,address, city, state});
    if(!data.success){
        res.status(401).json(data.error.issues.message);
    }else{
    try{
        await userModel.create({
            name,
            password,
            age,
            gender,
            DOB,
            adhaarNumber,
            address,
            city,
            state
        })
        const User = await userModel.findOne({
            adhaarNumber:adhaarNumber
        })
        //! adding pending requests
        await statusModel.create({
            status:"pending",
            user_id:User._id
        })
        res.status(200).json({token: User._id});
    }catch(e){
        res.status(402).json({error:"Form submission error"}); 
    }
}
})

//! end point for viewing status of application
app.post("/api/PCCStatus", auth_2, async (req, res) => {
    res.status(200).json({status: req.body.state});
})


//! end point for admin dashboard


app.listen(3000)