const jwt = require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'eval')
            if(decoded){
                req.body.userId = decoded.userId
                req.body.name = decoded.name
                next()
            }
            else{
                res.send({"msg":"Please Login First"})
            }
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports={auth}