const mongoose = require("mongoose");
const Team = require('../model/teamModel.js')
const TeamMember = require('../model/teamMemberModel.js')

const addTeam = async(req,res) =>{
    try {
        const  { year, members } = req.body
        if(!year){
            return res.status(400).send({
                message:'Please provide All fields',
                success:false,
                
            })

        }
        const newTeam = await Team.create({year,members})
        return res.status(201).send({
            success:true,
            message:"Team Added!!",
            newTeam
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in Adding Team',
            success:false,
            
        })
        
    }
}

const getTeam = async(req,res) =>{
    try {
        const { year }=req.params;
        const team = await Team.findOne({ year });
        return res.status(200).send({
            success: true,
            team
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error WHile getting Blog",
          error,
        });
        
    }
}

const addMember = async (req, res) => {
    let session;
    try {
        const { name, linkedin, presentation, position, year, team } = req.body;
        if (!name || !linkedin || !presentation || !position || !year || !team) {
            return res.status(400).send({
                message: 'Please provide all fields',
                success: false,
            });
        }

        const existingTeam = await Team.findById(team);
        if (!existingTeam) {
            return res.status(404).send({
                message: 'Team not found',
                success: false,
            });
        }

        session = await mongoose.startSession();
        session.startTransaction();

        const newMember = new TeamMember({ name, linkedin, presentation, position, year, team });
        await newMember.save({ session });
        existingTeam.members.push(newMember._id);
        await existingTeam.save({ session });
        
        await session.commitTransaction();
        session.endSession();

       
        return res.status(201).send({
            success: true,
            message: 'Member added successfully!',
            newMember,
        });

    } catch (error) {
        
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while adding member',
            error,
        });
    }
};


const getMember = async(req,res) => {
    try {
        const { year } = req.params;
        const teamMember = await TeamMember.find({ year }); // Use find() instead of findOne
        return res.status(200).send({
            success: true,
            teamMember, 
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While getting members",
            error,
        });
    }
}





module.exports={
    addTeam,
    getTeam,
    addMember,
    getMember
}









