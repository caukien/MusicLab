const { PlaylistController } = require("../Controllers/PlaylistController");
const { verifyToken } = require("../Middleware/Auth");
const router = require("express").Router();


router.post('/playlist/', verifyToken, PlaylistController.create)
router.get('/playlist/', verifyToken, PlaylistController.getall)
router.get('/playlist/:id', verifyToken, PlaylistController.get)
router.put('/playlist/:id', verifyToken, PlaylistController.update)
router.delete('/playlist/:id', verifyToken, PlaylistController.delete)

module.exports = router