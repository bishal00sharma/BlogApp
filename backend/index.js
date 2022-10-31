const express = require('express')
const mongoose =require("mongoose") ;
const User = require("./models/UserModel.js");
const BlogModel = require("./models/Blog.model")
const jwt =require("jsonwebtoken");
const nodemailer = require("nodemailer");
var cors = require('cors');
const OtpModel = require("./models/./otp.model");
const otpGenerator = require('otp-generator');
require("dotenv").config()



const MAIN_KEY = process.env.MAIN_KEY
const REFRESH_KEY = process.env.REFRESH_KEY

const MAIN_EXP = process.env.MAIN_EXP
const REFRESH_EXP = process.env.REFRESH_EXP



const app = express()
app.use(cors())
app.use(express.urlencoded( {extended: true }) )
app.use(express.json()) ;

const transport = nodemailer.createTransport({
    
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "morris81@ethereal.email",
        pass: "Pm35k11DDmNM9Mj1Mg"
    },

})

app.get('/' ,(req,res) => res.send('Hello'))






app.post("/signup", async(req,res) => {
    const { email,password, age} =req.body ;
    const user=  await User.create(req.body);
    console.log(email, password, age);

    transport.sendMail({
        to: email ,
        from: "hello@facebook.com",
        subject: "SignUp success",
        text: `Hello ${email}, your account has been created successfully`
    })
    .then(() => {
        console.log("Email sent successfully");
        res.send("User created successfully")
    })

   
})

app.post("/login",async(req,res) =>{
    const {email} =req.body ;
    const user =await User.findOne( req.body) ;
    if(!user){
       return res.send("Invalid credintials" ) ;
    }
    
    
    const token = jwt.sign( 
        { id: user._id , email: user.email , age: user.age } ,
        MAIN_KEY,{
            expiresIn: MAIN_EXP ,
        } //we have option to give expiry of token also
    );
    const refreshtoken= jwt.sign( {id: user._id , email: user.email , age: user.age} , REFRESH_KEY ,{ expiresIn :REFRESH_EXP}) ;
    // we are generating the refresh token here
    res.send({message: "Login in succesfully" , token ,refreshtoken});

}) 


app.post("/refresh" ,async (req,res) => {
    const refreshtoken =req.headers.authorization ;

    try{
        // if the refresh token is valid, then generate the main token
        const data =jwt.verify(refreshtoken , REFRESH_KEY);
        console.log(data)  //this will give data of that particular user
        const maintoken = jwt.sign(data, MAIN_KEY) ;
        // this above line is for generating a new main token
        return res.send( { token: maintoken }) ;
    }
    catch(e) {
        // here we will go when verify is giving error, i.e., the refresh token is not correct , or secret key of refresh token(REFRESHTOKEN1234) is not correct
       console.log(e)
        return res.send("Refresh token invalid") ;
    }
    // the job of refresh 
})



app.get("/user/:id", async (req,res) => {
    // for login , we have have generated the token
    // now for any private route like users page, we need to send token as authorization and the secret key to verify the token
    const { id } = req.params ;

    const token =req.headers["authorization"] ;

    if(!token){
        return res.status(401).send("Unauthorized");
    }
    // we have given try and catch becuase , let's say the token is wrong , then in that case our server will crash as there will be no else part, so for that we have catch part, so that if token in wrong , then in that case the response in the catch function will be send 
    try {
        const verification =jwt.verify( token, MAIN_KEY);
        //console.log("verification", verification);
        const user = await User.findById(id) ;
        return res.send(user)
    }
    catch(e){
        console.log(e.message) ;
        return res.status(401).send("Token is invalid");
    }
})


app.get("/github",(req,res)=>{
    console.log(req.query.code) ;
    res.send("You are successfully signed in. Now you can create Blog.")
})


app.post("/forget-password", async (req, res) => {
    const { email } = req.body;
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
  
    transport
      .sendMail({
        to: email,
        from: "bishal@gmail.com",
        subject: "reset-password OTP",
        text: `Your password reset request is successfull, OTP: ${otp}`,
      })
      .then(() => console.log("Email sent"));
  
     await OtpModel.create({ otp: otp, email: email });
  
    res.send(otp);
  });
  
  app.post("/reset-password", async (req, res) => {
    const { email, newPassword, otp } = req.body;
    const testOtp = await OtpModel.findOne({ email, otp });
    if (testOtp) {
      const updatePass = await User.findOneAndUpdate(
        { email },
        { password: newPassword }
      );
      return res.send("Password updated");
    } else {
      return res.status(401).send("INVALID OTP");
    }
  });

  app.get("/blogs", async (req, res) => {
    let data = await BlogModel.find({})
    res.send(data)
  })
  
  app.get("/blogs/:id", async (req, res) => {
    // var title = req.params.title.replace("-", " ")
    var id = req.params.id
    let data = await BlogModel.findOne({_id: id})
  
    res.send(data)
  })
  
  




mongoose.connect("mongodb://localhost:27017/nem201").then(() => {
    app.listen(8080 ,() => {
        console.log('Server started on port 8080') } )
}).catch((er)=> {
    console.log("This is error"+er)
})