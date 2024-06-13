const mongo = require('mongoose');

const GenreSchema = new mongo.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    song: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
},{timestamps: true})

const Genre = mongo.model('Genre', GenreSchema);

module.exports = Genre;