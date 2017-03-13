var playerModel = require('./player.model');
var NBA = require('nba');

exports.getPlayers = (req, res, next) => {
    playerModel.find({}, (err, docs) => {
        if (err) {
            console.error(err.stack);
            return next(err);
        }
        res.json(docs);
    });
};

exports.getSearchedPlayer = (req, res, next) => {
    var searchedPlayer = req.params.name;
    console.log('get params', searchedPlayer);
    playerModel.find({
            // $text: {
            //     $search: text
            // }
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
