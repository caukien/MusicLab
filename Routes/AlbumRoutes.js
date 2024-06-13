const { AlbumController } = require("../Controllers/AlbumController");
const { verifyToken, checkAdmin } = require("../Middleware/Auth");
const upload = require("../Middleware/Upload");
const router = require("express").Router();

router.post('/album/', verifyToken,upload.single("pic_path"),AlbumController.create)
router.get('/album/', AlbumController.getall)
router.get('/album/:id', AlbumController.get)
router.put('/album/:id', checkAdmin, upload.single("pic_path"),AlbumController.update)
router.delete('/album/:id', checkAdmin,AlbumController.delete)

module.exports = router