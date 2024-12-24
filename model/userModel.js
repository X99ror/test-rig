const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    rigId:{
        type:String,
        required:[true , 'username is required']
    },
    password:{
        type:String,
        required:[true , 'password is required']
    }
})

const Member = mongoose.model('Member',memberSchema)

module.exports = Member;

