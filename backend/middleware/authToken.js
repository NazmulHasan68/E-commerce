const jwt = require('jsonwebtoken')

 async function AuthToken(req, res, next) {
  try {
    const token = req?.cookies?.token 
    if(!token){
        return res.status(200).json({
            message : "please login .....!",
            error : true,
            success: false
        })
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded)=>{
        console.log(err);
        
        if(err){
            console.log("error auth ", err);
            
        }
        req.userId= decoded?._id
        next()
    })

    
  } catch (error) {
    res.status(400).json({
        message : error.message || error,
        data : [],
        error : true,
        success: false
    })
  }
}
module.exports = AuthToken
