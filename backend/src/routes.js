const express = require('express');

const routes = express.Router();

const HeroController = require('./controllers/HeroController');
const LikeController = require('./controllers/LikeController');

routes.get('/heroes', HeroController.index);
routes.post('/heroes', HeroController.create);
routes.post('/likes/:id', LikeController.create);

module.exports = routes;