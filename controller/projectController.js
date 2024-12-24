const mongoose = require('mongoose');
const Project = require('../model/projectModel.js')


const getAllProjects = async(req,res) =>{
    try {
        const projects = await Project.find({})
        if(!projects){
            return res.status(200).send({
                success:false,
                message:'No Blogs Found'

            })
        }
        return res.status(200).send({
            success:true,
            Blogcount:projects.length,
            message:'All blogs are Found',
            projects
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in getting Blogs',
            success:false,
            
        })
        
    }

};

const createProjects = async(req,res) =>{

    try {
        const {title, description, image} = req.body
        if(!title||!description||!image){
            return res.status(400).send({
                message:'Please provide All fields',
                success:false,
                
            })

        }
        
        const newProject = await Project.create({title, description, image})
        session = await mongoose.startSession();
        session.startTransaction();

        await newProject.save({ session });


  
        await session.commitTransaction();
        return res.status(201).send({
            success:true,
            message:"Project Created!!",
            newProject
        })
        

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in Project Blogs',
            success:false,
            
        })

        
    }

};

const updateProjects = async(req,res) =>{
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await Blog.findByIdAndUpdate(
          id,
          { title, description, image },
          { new: true }
        );
        return res.status(200).send({
          success: true,
          message: "Blog Updated!",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error WHile Updating Blog",
          error,
        });
      }
    };
    
const deleteProjects = async (req, res) => {
    try {
      const project = await Project
        .findByIdAndDelete(req.params.id)
        .populate("user");
      
      return res.status(200).send({
        success: true,
        message: "Project Deleted!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Erorr WHile Deleteing Project",
        error,
      });
    }
  };

const getProjectById = async(req,res) =>{
    try {
        const {id} = req.params
        const projects = await Project.findById(id)
        if(!projects){
            return res.status(404).send({
                success:false,
                message:'Cannot find the Blog'

            })
        }
        return res.status(200).send({
            success:true,
            message:'Here is the Blog',
            blogs

        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in Finding that Blog',
            success:false,
            
        })
        
    }

};





module.exports={
    getAllProjects,
    createProjects,
    updateProjects,
    deleteProjects,
    getProjectById
   
}