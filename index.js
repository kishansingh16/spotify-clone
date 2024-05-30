const express=require("express");
const mongoose=require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");
const User=require("./models/User");
const authRoutes=require("./routes/auth");
const songRoutes=require("./routes/song");
require('dotenv').config();
const app=express();
const port=8080;

app.use(express.json());


mongoose.connect(
    "mongodb+srv://admin:"+
        process.env.MONGO_PASSWORD+
        "@cluster0.vouzhb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"   
).then((x)=>{
    console.log("CONNECTED TO MONGO ")
}).catch((err)=>{
    console.log("error");
});



//setup passport-jwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyisSupposedToBeSecret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        //done(error,doestheUserExist)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



//API:GET type :/:return text hello world
app.get("/",(req,res)=>{

    res.send("Hello World");
    
});

app.use("/auth",authRoutes);
app.use("/song",songRoutes);

app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})