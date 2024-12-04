const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const getAllUsers = async(req,res) =>{
    try {
        const query = req.query;
        const limit = query.limit||3;
        const page = query.page||1;
        const skip = (page-1)*limit;

        const users = await User.find({},{"_v":false,'password':false}).limit(limit).skip(skip);
    
        if (users.length === 0) {
          return res.status(404).json({ message: 'No users found' });
        }
    
        
        res.json({status:"success",data:users});
      } catch (error) {
       
        console.error('Error fetching users:', error);
        res.status(500).json({status:"fail",data:[]});
      }
}

const register = async (req, res) => {
    try { 


        const { name, email, follwers, password ,role} = req.body;    
            const hashedpassword = await bcrypt.hash(password,10);



        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Name, email, and password are required.",
            });
        }

        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            return res.status(400).json({
                status: "error",
                data: [],
                msg: "This email is already in use.",
            });
        }

        const newUser = await User.create({ name, email, follwers, password:hashedpassword ,role});
        
const token =await jwt.sign({email:newUser.email,id:newUser._id,role:newUser.role},process.env.JWT_SECRET_KEY,{expiresIn:'20s'})
// console.log(token)
newUser.token = token

        res.status(201).json({ status: "success", data: newUser });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
   
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email and password are required.",
            });
        }

      
        const user = await User.findOne({ email: email });
        
    
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found.",
            });
        }

  
        const matchedPassword = await bcrypt.compare(password, user.password);

   
        if (matchedPassword) {
            const token =await jwt.sign({email:user.email,id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'20m'})
            // console.log(token)
            user.token = token
            res.status(200).json({ status: "success", data: {token} });
            
        } else {
         
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials.",
            });
        }
    } catch (error) {
       
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = {
    getAllUsers,
    register,
    login
}