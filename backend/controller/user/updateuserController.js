const userModel = require("../../models/userMode")

async function upuserController(req, res) {
    try {
        const sessionUser = req.userId
        const {userId, email, name, role} = req.body
        const payload = {
            ...(email && {email : email} ),
            ...(name && {name : name}),
            ...(role && {role : role})
        }

        const user = await userModel.findById(sessionUser)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)
        res.json({
            data : updateUser,
            message : " user updated",
            success : true,
            error: false
        })
    } catch (error) {
        res.json({   
            message : error.message || error, 
            error : true,
            success :false,
        })
    }
}

module.exports = upuserController