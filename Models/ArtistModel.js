const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String
    },
    birthday:{
        type:Date
    },
    des:{
        type:String
    },
    country:{
        type:String
    },
    pic_path:{
        type: String
    },
    album:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'album'
    }],
    song: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song'
    }]
})

const Artist = mongoose.model('Artist', ArtistSchema)
module.exports = Artist