const userModel = require("../../models/userMode")
const brcypt = require('bcryptjs')


async function userSignUpController(req, res) {
    try {
        const {email , password  , name } = req.body
        const user = await userModel.findOne({email})
        if(user){
            throw new Error(" Already user exits")
        }
        
        if(!email){
            throw new Error("Please Provide email")
        }
        if(!password){
            throw new Error("Please Provide password")
        }
        if(!name){
            throw new Error("Please Provide name")
        }

        const salt = brcypt.genSaltSync(10);
        const hashPassword =await brcypt.hashSync(password, salt)
        if(!hashPassword){
            throw new Error("Something is Wrong")
        }
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }
        const userData = new userModel(payload)
        const saveUser =await userData.save()

        res.status(200).json({
            data :saveUser,
            success : true,
            error : false,
            message : "User created successfully"
        })

    } catch (error) {   
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = userSignUpController