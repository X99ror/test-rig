const Member = require('../model/userModel.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async(req,res) => {
    try {

        const {rigId, password} = req.body
        if(!rigId||!password){
            return res.status(400).send({
                message:'Please fill all the fields',
                success:false,
               
    
            })

        }
        const existinguser = await Member.findOne({rigId})
        if(existinguser){
            return res.status(400).send({
                message:'User Already exists',
                success:false,
               
    
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const data = new Member({ 
            rigId, 
            password:hashedPassword
        })
        const saved = await data.save()
        return res.status(200).send({
            message:'User created',
            success:true,
            data:saved

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in user registration',
            success:false,
            
        })
    }

};

const login = async(req,res) => {
    try {
        const {rigId,password} = req.body
        if(!rigId || !password){
            return res.status(401).send({
                message:'Please provide rigId or password',
                success:false,
               
    
            })

        }
        const user = await Member.findOne({rigId})
        if(!user){
            return res.status(200).send({
                message:'Member is not registered',
                success:false,
                
            })

        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                message:'Invalid rigId or password',
                success:false,
               
    
            })
        }
        const exp = Date.now() + 1000 * 60 * 60 * 24;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly:true,
        sameSite: 'lax'
         })
        return res.status(200).send({
            success:true,
            message:'login successful',
            user

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in Login',
            success:false,
            
        })
        
    }

};
function logout(req, res) {
    try {
      
      res.clearCookie("Authorization", {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production" // Set this as per your environment
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }

  function checkAuth(req, res) {
    try {
      res.sendStatus(200); 
    } catch (err) {
      console.log(err);
      return res.sendStatus(400); 
    }
  }

module.exports={
    registerUser,
    login,
    logout,
    checkAuth
}









