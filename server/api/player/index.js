var express = require('express');
var controller = require('./playerController');
var router = express.Router();
// var NBA = require('nba');
// var playerModel = require('./player.model');

router.get('/', controller.getPlayers);
router.get('/searchedPlayer/:name', controller.getSearchedPlayer);
router.get('/profile/:id', controller.getPlayerProfile);

module.exports = router;
