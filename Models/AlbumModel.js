const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    },
    song: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
    pic_path:{
        type: String
    },
    release:{
        type: Date
    }
})

const Album = mongoose.model('Album', AlbumSchema)
module.exports = Album