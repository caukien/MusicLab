const express = require('express');
const route = express.Router();
const {GerneController} = require('../Controllers/GenreController.js');
const { verifyToken, checkAdmin } = require('../Middleware/Auth.js');

route.post('/genre/', GerneController.Create)
route.get('/genre/', GerneController.GetGenres)
route.get('/genre/:id', GerneController.GetGenre)
route.put('/genre/:id', GerneController.UpadateGerne)
route.delete('/genre/:id', GerneController.Delete)

module.exports = route