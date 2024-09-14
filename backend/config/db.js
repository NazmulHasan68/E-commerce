const mongoose = require('mongoose');
async function connecDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL)  
    } catch (error) {
        console.log(error); 
    }
}

module.exports = connecDB