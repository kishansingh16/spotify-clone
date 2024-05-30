const mongoose= require("mongoose");

const User=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:false
    },
    email:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    likedSongs:{
        type:String,
        default:"",
    },
    likedPlaylists:{
        type:String,
        default:"",
    },
    SubscribedArtists:{
        type:String,
        default:"",
    },

})

const UserModel=mongoose.model("User",User);

module.exports=UserModel;