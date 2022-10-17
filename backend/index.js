const express = require('express')
const mongoose =require("mongoose") ;
const User = require("./models/UserModel.js")
const jwt =require("jsonwebtoken");

const app = express()

app.use(express.urlencoded( {extended: true }) )
app.use(express.json()) 


app.get('/' ,(req,res) => res.send('Hello'))


app.post("/signup", async(req,res) => {
    const { email,password, age} =req.body ;
    await User.create(req.body);
    console.log(email, password, age)
    res.send("User created successfully")
})

app.post("/login",async(req,res) =>{
    const {email} =req.body ;
    const user =await User.findOne( req.body) ;
    if(!user){
       return res.send("Invalid credintials" ) ;
    }
    
    
    const token = jwt.sign( 
        { id: user._id , email: user.email , age: user.age } ,
        "SECRET1234",{
            expiresIn: "70000 seconds" ,
        } //we have option to give expiry of token also
    );
    const refreshtoken= jwt.sign( {id: user._id , email: user.email , age: user.age} , "REFRESHTOKEN1234") ;
    // we are generating the refresh token here
    res.send({message: "Login in succesfully" , token ,refreshtoken});

}) 


app.post("/refresh" ,async (req,res) => {
    const refreshtoken =req.headers.authorization ;

    try{
        // if the refresh token is valid, then generate the main token
        const data =jwt.verify(refreshtoken , "REFRESHTOKEN1234");
        console.log(data)  //this will give data of that particular user
        const maintoken = jwt.sign(data, "SECRET1234") ;
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
        const verification =jwt.verify( token, "SECRET1234");
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

mongoose.connect("mongodb://localhost:27017/nem201").then(() => {
    app.listen(8080 ,() => {
        console.log('Server started on port 8080') } )
}).catch((er)=> {
    console.log("This is error"+er)
})