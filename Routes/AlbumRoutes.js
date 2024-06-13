const { AlbumController } = require("../Controllers/AlbumController");
const router = require("express").Router();

router.post('/album/', AlbumController.create)
router.get('/album/', AlbumController.getall)
router.get('/album/:id', AlbumController.get)
router.put('/album/:id', AlbumController.update)
router.delete('/album/:id', AlbumController.delete)

module.exports = router