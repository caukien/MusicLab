const router = require('express').Router();

const {ArtistController} = require('../Controllers/ArtistController.js');
const { verifyToken, checkAdmin } = require('../Middleware/Auth.js');
const upload = require('../Middleware/Upload.js');

router.post('/artist/', verifyToken,upload.single("pic_path"), ArtistController.create)
router.get('/artist/', ArtistController.getall)
router.get('/artist/:id', ArtistController.get)
router.put('/artist/:id', checkAdmin,upload.single("pic_path"), ArtistController.update)
router.delete('/artist/:id', checkAdmin,ArtistController.delete)

module.exports = router