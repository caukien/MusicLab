const Playlist = require("../Models/PlaylistModel");
const User = require("../Models/UserModel");

exports.PlaylistController = {
  create: async (req, res) => {
    try {
      const newPlaylist = new Playlist(req.body);
      const save = await newPlaylist.save();
        if (req.body.createdby) {
          const user = User.findById(req.body.createdby);
          await user.updateOne({ $push: { playlist: save._id } });

        }

      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getall: async (req, res) => {
    try {
      const songs = await Playlist.find().populate("song", ["name"]);
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const song = await Playlist.findById(req.params.id);
      res.status(200).json(song);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      await playlist.updateOne({ $set: req.body });

      res.status(204).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      await User.updateMany(
        { playlist: req.params.id },
        { $pull: { playlist: req.params.id } }
      );

      await Playlist.findByIdAndDelete(req.params.id);
      
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
