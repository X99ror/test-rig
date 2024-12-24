const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true , 'title is required']
    },
    description:{
        type:String,
        required:[true , 'description is required']
    },
    image:{
        type:String,
        required:[true , 'image is required']
    }
},{timestamps:true})

const Project = mongoose.model('Project',projectSchema)

module.exports = Project;