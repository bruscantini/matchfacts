var playerModel = require('./player.model');
var NBA = require('nba');

exports.getPlayers = (req, res, next) => {
    playerModel.find({}, null, null, (err, docs) => {
        if (err) {
            console.error(err.stack);
            return next(err);
        }
        res.json(docs);
    });
};

exports.getPlayerProfile = (req, res, next) => {
    NBA.stats.playerProfile({
        PlayerID: req.params.id
    }).then((playerProfile) => {
        res.json(playerProfile);
    }).catch((error) => {
        console.error(error.stack);
        return next(error);
    });
};
