const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    name:{type:String,required:true},
    title: {type:String,required:true},
    body: {type:String,required:true},
    device: {type:String,required:true},
    userId:{type:String,required:true}
},{
    versionKey:false
})

const postModel = mongoose.model("post",postSchema)

module.exports = {postModel}