const express = require("express")
const {userModel} = require("../model/usres.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            const data = userModel({name,email,gender,password:hash})
            await data.save()
            res.status(200).send({"msg":"New user added!"})
        });
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const data = await userModel.findOne({email})
        console.log(data)
        if(data){
            bcrypt.compare(password, data.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({ userId:data._id , name:data.name }, 'eval')
                    res.status(200).send({"msg":"Login Successfull!" , "token":token})
                }
                else{
                    res.status(200).send({"msg":"Invalid user details!"})
                }
            })
        }
        else{
            res.status(200).send({"msg":"Invalid user details!"})
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

module.exports={userRouter}