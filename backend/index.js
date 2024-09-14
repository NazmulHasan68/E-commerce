const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connecDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')



const app = express()
app.use(cors(
    { origin : process.env.FONEND_URL,
        credentials : true
    }
))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)


connecDB()
const PORT = 8000 || process.env.PORT

app.listen(PORT, ()=>console.log("server is running")
)