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
const router = express.Router();
const {auth_1} = require("../middlewares/auth1");
app.use(express.json());
app.use(cors());
// console.log("hey")

mongoose.connect(process.env.MONGO_CONNECTION)

router.post("/", auth_1 ,async (req, res) =>{
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

module.exports = (
    {
        PCCInformation : router
    }
)
