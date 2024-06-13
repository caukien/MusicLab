const router = require('express').Router();

const {ArtistController} = require('../Controllers/ArtistController.js');
const upload = require('../Middleware/Upload.js');

router.post('/artist/', upload.single("pic_path"), ArtistController.create)
router.get('/artist/', ArtistController.getall)
router.get('/artist/:id', ArtistController.get)
router.put('/artist/:id', upload.single("pic_path"), ArtistController.update)
router.delete('/artist/:id', ArtistController.delete)

module.exports = router