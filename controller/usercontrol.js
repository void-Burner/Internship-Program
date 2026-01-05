const userModel = require("../model/user");

const loginUser = async (req,resp) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            resp.send({message:"Name, email and password are required"});
            return;
        }

        if(typeof email != "string" || typeof password != "string"){
            resp.send({meassage:"Invalid email or password"});
            return;
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            resp.send({message:"User with this email already exists"});
            return;
        }

        const newUser = await userModel.create({name, email, password});
        resp.send({message:"User created successfully", data:newUser});
    
    }
    catch(error){
        resp.send({message:"Error creating user",error});
    }

}

module.exports = {loginUser};