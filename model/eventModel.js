const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true , 'title is required']
    },
    description:{
        type:String,
        required:[true , 'description is required']
    }
})

const Event = mongoose.model('Event',eventSchema)

module.exports = Event;