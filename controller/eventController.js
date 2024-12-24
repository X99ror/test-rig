const mongoose = require('mongoose');
const Event = require('../model/eventModel.js')


const getEvents = async(req,res) =>{
    try {
        const events = await Event.find({})
        if(!events){
            return res.status(200).send({
                success:false,
                message:'No Events Found'

            })
        }
        return res.status(200).send({
            success:true,
            events
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in getting Events',
            success:false,
            
        })
        
    }

};

const addEvents = async(req,res) =>{

    try {
        const {title, description} = req.body
        if(!title||!description){
            return res.status(400).send({
                message:'Please provide All fields',
                success:false,
                
            })

        }
        
        const newEvent = await Event.create({title, description})
        return res.status(201).send({
            success:true,
            message:"Event Added!!",
            newEvent
        })
        

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in Adding Events',
            success:false,
            
        })

        
    }

};

module.exports ={
    getEvents,
    addEvents
}