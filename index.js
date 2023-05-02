const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const {userRouter} = require("./Routes/auth.router")
const {postRouter} = require("./Routes/post.router")
const {auth} = require("./middleware/auth.middleware")
const app = express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.get("/",(req,res)=>{
    res.send("HomePage")
})
app.use(auth)
app.use("/posts",postRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log(error)
    }

    console.log("Server is running at 8080")
})