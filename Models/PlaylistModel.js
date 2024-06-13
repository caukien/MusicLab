const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    song: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }]
},{timestamps: true})
const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist