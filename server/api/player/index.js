var express = require('express');
var controller = require('./playerController');
var router = express.Router();
// var NBA = require('nba');
// var playerModel = require('./player.model');

router.get('/', controller.getAllPlayers);
router.get('/getPlayer/:id', controller.getPlayer);
router.get('/searchedPlayer/:name', controller.getSearchedPlayers);
router.get('/profile/:id', controller.getPlayerProfile);

module.exports = router;
