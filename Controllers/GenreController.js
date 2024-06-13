const Genre = require("../Models/GenreModel");
const Song = require("../Models/SongModel");

exports.GerneController = {
  Create: async (req, res) => {
    let { name } = req.body;
    if (!name) {
      return res.status(400).json({ messsage: "Name required" });
    }
    try {
      const existingGenre = await Genre.findOne({ name });
      if (existingGenre) {
        return res.status(400).json({ message: "Genre already exists" });
      }

      const genre = new Genre({ name });
      await genre.save();

      res.status(201).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetGenres: async (req, res) => {
    try {
      const genres = await Genre.find().populate("song", ["name"]);
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  GetGenre: async (req, res) => {
    const { id } = req.params;

    try {
      const genre = await Genre.findById(id);
      if (!genre) {
        return res.status(404).json({ message: "Genre not found" });
      }

      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  UpadateGerne: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const genre = await Genre.findById(id);
      if (!genre) {
        return res.status(404).json({ message: "Genre not found" });
      }

      genre.name = name;
      await genre.save();
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  Delete: async (req, res) => {
    const { id } = req.params;

    try {
      const genre = await Genre.findByIdAndDelete(id);
      if (!genre) {
        return res.status(404).json({ message: "Genre not found" });
      }
      await Song.updateMany(
        { genre: req.params.id },
        { $pull: { genre: req.params.id } }
      );

      res.status(200).json({ message: "Genre deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
