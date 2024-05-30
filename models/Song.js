const mongoose = require("mongoose")

const Song=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true,
    },
    track:{
        type:String,
        require:true,
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
})

const SongModel=mongoose.model("Song",Song);

module.exports=SongModel;
