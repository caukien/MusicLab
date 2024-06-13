const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    genre:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    }],
    album:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    },
    release: {
        type: Date,
    },
    pic_path:{
        type: String
    },
    song_path:{
        type: String
    }
})
const Song = mongoose.model('Song', SongSchema)

module.exports = Song