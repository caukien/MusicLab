const Artist = require('../Models/ArtistModel')
const Song = require('../Models/SongModel')
const uploadFile = require("../Middleware/UploadService")
const Album = require('../Models/AlbumModel')

exports.ArtistController = {
    create: async(req, res) => {
        try {
            const file = req.file
            // if(!file){
            //     return res.status(400).json({ message: 'File is required' });
            // }

            const fileBuffer = file.buffer.toString('base64');
            const preData = {
                name: file.originalname,
                type: file.mimetype,
                data: fileBuffer,
            };
            const uploadResponse = await uploadFile(preData);
            const newArtist = new Artist(req.body)
            newArtist.pic_path = await uploadResponse.link
            
            // console.log(uploadResponse);
            // const newArtist = new Artist({ name, gender, birthday, des, country, pic_path: uploadResponse.link })
            
            const save = await newArtist.save()
            if(req.body.song){
                const song = Song.findById(req.body.song)
                await song.updateOne({$push: {song: save._id}});
            }
            res.status(200).json(save)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getall: async(req, res) =>{
        try {
            const artist = await Artist.find()
            res.status(200).json(artist)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    get: async(req, res) =>{
        try {
            const artist = await Artist.findById(req.params.id);
            res.status(200).json(artist);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    update: async(req, res) =>{
        try {
            const file = req.file
            if(file){
                const fileBuffer = file.buffer.toString('base64');
                const preData = {
                    name: file.originalname,
                    type: file.mimetype,
                    data: fileBuffer,
                };
                const uploadResponse = await uploadFile(preData);
                
                await Artist.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    des: req.body.des,
                    country: req.body.country,
                    pic_path: uploadResponse.link,
                    album: req.body.album,
                    song: req.body.song,
                });

                // song.pic_path = await uploadResponse.link
                // const song = await Artist.findOne(req.params.id)
                // await song.updateOne({ $set: req.body });
                
                res.status(200).json("Updated successfully!");
                // res.status(201).json(song);
            }else{
                const song = await Artist.findById(req.params.id);
                await song.updateOne({ $set: req.body });
                res.status(200).json("Updated successfully!");
            }

            // const song = await Artist.findById(req.params.id);
            // song.pic_path = await uploadResponse.link
            // await song.updateOne({ $set: req.body });
            // res.status(200).json("Updated successfully!");
          } catch (err) {
            res.status(500).json(err);
          }
    },
    delete: async(req, res) =>{
        try {
            await Album.updateMany(
              { artist: req.params.id },
              { $pull: { artist: req.params.id } }
            );
            await Artist.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully");
          } catch (err) {
            res.status(500).json(err);
          }
    }
}