const Song = require("../Models/SongModel");
const Genre = require("../Models/GenreModel");
const Artist = require("../Models/ArtistModel");
const Album = require("../Models/AlbumModel");
const uploadFile = require("../Middleware/UploadService");

exports.songController = {
  create: async (req, res) => {
    const { name, genre, artist, album, release, pic_path } = req.body;
    try {
      const file = req.file;
      const fileBuffer = file.buffer.toString("base64");
      const preData = {
        name: file.originalname,
        type: file.mimetype,
        data: fileBuffer,
      };
      const uploadResponse = await uploadFile(preData);
      // const newSong = new Song(req.body);
      const newSong = new Song({
        name,
        genre,
        artist,
        album,
        release,
        pic_path,
        song_path: uploadResponse.view,
      });
      const save = await newSong.save();

      if (req.body.genre && req.body.artist) {
        const genre = Genre.findById(req.body.genre);
        await genre.updateOne({ $push: { song: save._id } });

        const singer = Artist.findById(req.body.artist);
        await singer.updateOne({ $push: { song: save._id } });

        const album = Album.findById(req.body.artist);
        await album.updateOne({ $push: { song: save._id } });
      }

      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getall: async (req, res) => {
    try {
      const songs = await Song.find();
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id).populate("genre", [
        "name",
      ]);
      res.status(200).json(song);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const file = req.file;
    try {
      const song = await Song.findById(req.params.id);
      //For Genre
      const oldGenres = song.genre;
      const newGenres = req.body.genre || [];

      //For Artist
      const oldArtists = song.artist;
      const newArtists = req.body.artist || [];

      if(!file){
        await song.updateOne({ $set: req.body });

        // Xóa ID bài hát khỏi các genre cũ mà không còn trong genre mới
        const genresToRemove = oldGenres.filter(genre => !newGenres.includes(genre.toString()));
        await Genre.updateMany({ _id: { $in: genresToRemove } }, { $pull: { song: req.params.id } });
        // Thêm ID bài hát vào các genre mới
        await Genre.updateMany({ _id: { $in: newGenres } }, { $addToSet: { song: req.params.id } });

        // Cập nhật thông tin artist
        const artistsToRemove = oldArtists.filter(artist => !newArtists.includes(artist.toString()));
        await Artist.updateMany({ _id: { $in: artistsToRemove } }, { $pull: { song: req.params.id } });
        await Artist.updateMany({ _id: { $in: newArtists } }, { $addToSet: { song: req.params.id } });

        // await Genre.updateMany({ song: req.params.id }, {$pull: {song: req.params.id}});
        // await Genre.findByIdAndUpdate(req.body.genre, {$push: {song: req.params.id}});
        
        // const genre = Genre.findById(req.body.genre);
        // await genre.updateOne({ $push: { song: save._id } });

        res.status(204).json("Updated successfully!");
        
      }else{
        const fileBuffer = file.buffer.toString('base64');
        const preData = {
            name: file.originalname,
            type: file.mimetype,
            data: fileBuffer,
        };
        const uploadResponse = await uploadFile(preData);
        await Song.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            genre: req.body.genre,
            artist: req.body.artist,
            album: req.body.album,
            release: req.body.release,
            // pic_path: uploadResponse.link,
            song_path: uploadResponse.view,
        });

        // Xóa ID bài hát khỏi các genre cũ mà không còn trong genre mới
        const genresToRemove = oldGenres.filter(genre => !newGenres.includes(genre.toString()));
        await Genre.updateMany({ _id: { $in: genresToRemove } }, { $pull: { song: req.params.id } });
        // Thêm ID bài hát vào các genre mới
        await Genre.updateMany({ _id: { $in: newGenres } }, { $addToSet: { song: req.params.id } });

        // Cập nhật thông tin artist
        const artistsToRemove = oldArtists.filter(artist => !newArtists.includes(artist.toString()));
        await Artist.updateMany({ _id: { $in: artistsToRemove } }, { $pull: { song: req.params.id } });
        await Artist.updateMany({ _id: { $in: newArtists } }, { $addToSet: { song: req.params.id } });

        res.status(204).json("Updated successfully!");
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      await Genre.updateMany(
        { song: req.params.id },
        { $pull: { song: req.params.id } }
      );
      await Artist.updateMany(
        { song: req.params.id },
        { $pull: { song: req.params.id } }
      );
      await Album.updateMany(
        { song: req.params.id },
        { $pull: { song: req.params.id } }
      );
      
      await Song.findByIdAndDelete(req.params.id);
      res.status(204).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};