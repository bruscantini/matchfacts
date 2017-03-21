var playerModel = require('./player.model');
var NBA = require('nba');

exports.getAllPlayers = (req, res, next) => {
    playerModel.find({}, (err, docs) => {
        if (err) {
            console.error(err.stack);
            return next(err);
        }
        res.json(docs);
    });
};

exports.getSearchedPlayers = (req, res, next) => {
    var searchedPlayer = req.params.name;
    playerModel.find({
            fullName: {
                $regex: new RegExp(searchedPlayer, "i")
            }
        })
        .limit(10)
        .exec((err, docs) => {
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

exports.getPlayer = (req, res, next) => {
    let playerId = req.params.id;
    playerModel.findOne({
        'playerId': playerId
    }, (err, player) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(player);
    });
};

exports.getPlayerInfo = (req, res, next) => {
    NBA.stats.playerInfo({
        PlayerID: req.params.id
    });
};
