const Song = require("../Models/SongModel");
const Artist = require("../Models/ArtistModel");
const Album = require("../Models/AlbumModel");

exports.AlbumController = {
  create: async (req, res) => {
    try {
      const newAlbum = new Album(req.body);
      const save = await newAlbum.save();
      if (req.body.song && req.body.artist) {
        const song = Song.findById(req.body.song);
        await song.updateMany({ $push: { album: save._id } });

        const artist = Artist.findById(req.body.artist);
        await artist.updateOne({ $push: { album: save._id } });
      }
      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getall: async (req, res) => {
    try {
      const albums = await Album.find().populate("song", ["name"]);
      res.status(200).json(albums);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id).populate("song", [
        "name",
      ]);
      res.status(200).json(album);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json("Album not found!");
      }

      const oldSongs = album.song;
      const newSongs = req.body.song || [];

      const oldArtist = album.artist ? album.artist.toString() : null;
      const newArtist = req.body.artist;

      await album.updateOne({ $set: req.body });

      // Xóa ID bài hát khỏi album cũ
      const songsToRemove = oldSongs.filter(song => !newSongs.includes(song.toString()));
      await Song.updateMany({ _id: { $in: songsToRemove } }, { $pull: { album: req.params.id } });
      // Thêm ID bài hát vào album mới
      await Song.updateMany({ _id: { $in: newSongs } }, { $addToSet: { album: req.params.id } });
      
      // Xóa ID album khỏi nghệ sĩ cũ nếu nghệ sĩ thay đổi
      if (oldArtist && oldArtist !== newArtist) {
        await Artist.findByIdAndUpdate(oldArtist, { $pull: { album: req.params.id } });
      }

      // Thêm ID album vào nghệ sĩ mới
      if (newArtist && oldArtist !== newArtist) {
        await Artist.findByIdAndUpdate(newArtist, { $addToSet: { album: req.params.id } });
      }

      
      res.status(204).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      await Song.updateMany(
        { album: req.params.id },
        { $pull: { album: req.params.id } }
      );

      await Artist.updateMany(
        { album: req.params.id },
        { $pull: { album: req.params.id } }
      );

      await Album.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
