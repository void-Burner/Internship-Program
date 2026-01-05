const userModel = require("../model/user");
const bcrypt = require("bcrypt")
const dispo_emails = require("disposable-email-domains")

const loginUser = async (req,resp) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            resp.status(404).send({message:"Name, email and password are required"});
            return;
        }

        if(typeof email != "string" || typeof password != "string"){
            resp.status(400).send({message:"Invalid email or password"});
            return;
        }
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Password regex: Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
        const pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const domain = email.split("@")[1]


        if(!pass_regex.test(password)){
            resp.status(400).send({meassage:"Invalid Password frormat,Password should have 8 charecters , one uppercase , one lowercase , one number and one special charecter"})
            return;
        }

        if(!email_regex.test(email)){
            resp.status(400).send({meassage:"Invalid email format"})
            return;
        }

        if(dispo_emails.includes(domain)){
            resp.status(403).send({meassage:"Spam Email Found"})
            return;
        }
        const updatedEmail = email.trim().toLowerCase()
        const existingUser = await userModel.findOne({email});

        if(existingUser){
           if(!existingUser.password){
            resp.status(502).send({message: "You logged in with Google last time. Please use Google login."});
            return;
           }

           const match = await bcrypt.compare(password, existingUser.password);

           if(!match){
            resp.status(401).send({message: "Invalid credentials"});
            return;
           }

           if(!existingUser.verified){
            resp.status(403).send({message: "Account not verified. Please verify your email first."});
            return;
           }

           resp.status(200).send({message: "Login successful", user: { name: existingUser.name, email: existingUser.email }});
           return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt);
        // This code creates a new user in the database if they do not already exist.
        // It hashes the password and sets the user as unverified initially.
        const result = await userModel.create({
            name,
            email: updatedEmail,
            password: hashpass,
            verified: false  // New users start as unverified
        });

        resp.status(201).send({message: "User created successfully", data: result});

    
    }
    catch(error){
        resp.status(500).send({message:"Error creating user",error});
    }

}

module.exports = {loginUser};