const mongoose = require("mongoose")

const Playlist=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"songs"
        },
    ],
    collaborators:[
        {
            type:mongoose.Types.ObjectId,
            ref:"users"
        }
    ]
});

const PlaylistModel=mongoose.model("Playlist",Playlist);

module.exports=PlaylistModel;
