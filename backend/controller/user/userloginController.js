const userModel = require("../../models/userMode")
const bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken')

async function userloginController(req, res) {
    try {
        const {email , password} = req.body
        if(!email){
            throw new Error("Enter your email")
        }
        if(!password){
            throw new Error("Enter your password")
        }

        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        const checkPassword =await bcryptjs.compare(password,user.password)
        if(!checkPassword){
            throw new Error("please check the password")
        }else{
            const tokenData = {
                _id: user._id,
                email:user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60*60*8})
            const tokenOption = {
                httpOnly : true,
                secure: true
            }
            res.cookie("token",token, tokenOption).json({
                message : "login successfully",
                data : token,
                success : true,
                error: false
             })
        }
        
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userloginController