const { PlaylistController } = require("../Controllers/PlaylistController");
const router = require("express").Router();


router.post('/playlist/', PlaylistController.create)
router.get('/playlist/', PlaylistController.getall)
router.get('/playlist/:id', PlaylistController.get)
router.put('/playlist/:id', PlaylistController.update)
router.delete('/playlist/:id', PlaylistController.delete)

module.exports = router