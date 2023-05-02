const express = require("express")
const {postModel} = require("../model/post.model")
const postRouter = express.Router()

postRouter.post("/create",async(req,res)=>{
    try {
        const data = postModel(req.body)
        await data.save()
        res.send("Added a new post!")
    } catch (error) {
        res.send(error)
    }
})

postRouter.get("/",async(req,res)=>{
    const query = req.query
    try {
        const data = await postModel.find({$and :[{userId:req.body.userId},query]})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    const data = await postModel.findOne({_id:id})
    try {
        if(req.body.userId!== data.userId){
            res.send({"msg":error.message})
        }
        else{
            await postModel.findByIdAndUpdate({_id:id},req.body)
            res.send({"msg":"User Updated!"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    const data = await postModel.findOne({_id:id})
    try {
        if(req.body.userId!== data.userId){
            res.send({"msg":error.message})
        }
        else{
            await postModel.findByIdAndDelete({_id:id})
            res.send({"msg":"User Deleted!"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = {postRouter}