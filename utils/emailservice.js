const { response } = require("express");
const nodemailer = require("nodemailer")
require('dotenv').config()

const transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS

    }
});

const email = async(resp,statuscode,email,otp) => {
try{
    const mailoptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification OTP",
        text:  'Your one time password (otp) for login verification is: ' + otp 
    };

    const info = await transpoter.sendMail(mailoptions);
    console.log("Email sent" + info)
    resp.status(statuscode).send({message:"Otp sent to your email!"})
}
catch(error){

};
}
