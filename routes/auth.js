const express=require("express");
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const {getToken}=require("../utils/helpers");



router.post("/register",async(req,res)=>{
    //This code is run when the /register api is called as POST
    //My req.body will be of the format {email,password,firstname,lastname,username}
    const {email, password, firstName, lastName, username}=req.body;

    //step2 :Does the user with this mail id Exists?if yes throw an error

    const user=await User.findOne({email:email})
    if(user){
        return res
        .status(403)
        .json({error:"A user with this email already exists"})
    }
 
    //step3: create a new user in the db 
    //step 3.1:we do not store password in the plain text
    const hashedPassword=await bcrypt.hash(password,10);
    const newUserData= {
        email,
        password:hashedPassword,
        firstName,
        lastName,
        username,
        
    };
    const newUser=await User.create(newUserData);


    ///step 4: we want to craete token to return the user 

    const token =await getToken(email,newUser);
    

    //step5: return the result  to the user

    const userToReturn={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});


router.post("/login",async(req,res)=>{
    //Step1: get email and password given by the user from req.body
    const {email,password}=req.body;

    //step2: check if a user with the given email exists .if not the credentials aare invalid 
    const user= await User.findOne({email:email});
    if(!users){
        return res.status(403).json({err:"Invalid credentials"});
    }
    //step3: if the user exists ,cjheck if ther password is correct
    //this is a tricky step beacuse we have store the password as hashed password 
    //our hash of xyz depends on 2 parameters 
    //if I keep those 2 parameters same ,xyz always gives the same hash.
    // we can not do if(password===user.password)
    //bcrypt.comapre enabled us to compare 1 password in plaintext(password from req.body) to a hashed password (the one in our db) security. 
    const isPasswordValid=await bcrypt.compare(password, user.password)
    //This will be true or false 
    if(!isPasswordValid){
        return res.status(403).json({err:"Invalid Password credentials"});    
    }
    //step4: if the credetials  arwe corret ,return a token 
    const token=await getToken(user.email,user);
    const userToReturn={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})
module.exports=router;