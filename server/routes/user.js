import express from "express";
import bcrypt from 'bcrypt'
import { User } from "../models/user.js";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
 const router = express.Router();

router.use(cors());

 router.post('/signup',async(req,res)=>{
    const {username, email, password} = req.body;
    const user = await User.findOne({email})
    const name = await User.findOne({username})
    if(user){
        return res.json({mesage:"user already exist"})
    }
    if(name){
        return res.json({message:"username already exists"})
    }
    const hashedpassword = await bcrypt.hash(password,10) 
    const newUser = new User({
        username,
        email,
        password:hashedpassword,
       
    })
    await newUser.save()
    return res.json({status:true , message:"record registed"})
})

    router.post('/login',async (req,res)=>{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.json({message : "user is not registered"})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
           
            return res.json({message:"incorrect password"})
        }
        const token = jwt.sign({username : user.username},process.env.KEY,{expiresIn:'1h'})
        res.cookie('token',token,{httpOnly:true,maxAge : 360000})
        return res.json({status:true , message:"loggedin successfully"})
    })

 export {router as UserRouter}