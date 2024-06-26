const router = require("express").Router();
const { songController } = require("../Controllers/songController");
const { verifyToken, checkAdmin } = require("../Middleware/Auth");
const upload = require("../Middleware/Upload");

router.post("/song/", verifyToken, upload.single("song_path"), songController.create);
router.get("/song/", songController.getall);
router.get("/song/:id", songController.get);
router.put("/song/:id", checkAdmin, upload.single("song_path"), songController.update);
router.delete("/song/:id", checkAdmin, songController.delete);

module.exports = router;
