const express = require('express');
const app = express();
const mongo = require('mongoose');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const cors = require('cors')
const cookieparser = require("cookie-parser")
const bodyparser = require("body-parser")

const GenreRoutes = require('./Routes/GenreRoutes.js')
const SongRoutes = require('./Routes/songRoutes.js')
const ArtistRoutes = require('./Routes/ArtistRoutes.js')
const AlbumRoutes = require('./Routes/AlbumRoutes.js')
const PlaylistRoutes = require('./Routes/PlaylistRoutes.js')
const UserController = require('./Routes/UserRoutes.js')

dotenv.config();
app.use(express.json())
app.use(cors());
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/api', GenreRoutes)
app.use('/api', SongRoutes)
app.use('/api', ArtistRoutes)
app.use('/api', AlbumRoutes)
app.use('/api', PlaylistRoutes)
app.use('/api', UserController)

app.get('/', (req, res)=>{
    return res.status(200).send("API FOR MusicLab")
})


mongo.connect(process.env.MONGO_ONLINE,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected");
    app.listen(PORT, () => {
        console.log(`Running on  ${PORT}`);
    })
})