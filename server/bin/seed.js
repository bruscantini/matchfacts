const mongoose = require('mongoose');
const Player = require('../api/player/player.model');
const NBA = require('nba');

const apiSuccess = function(resp) {

    let player = {
        playerId: resp.commonPlayerInfo[0].personId,
        firstName: resp.commonPlayerInfo[0].firstName,
        lastName: resp.commonPlayerInfo[0].lastName
    };
    players.push(player);
    //console.log('GOOD');
};
const apiFailure = function(err) {
    //console.log('hey buddy, no player');
};

mongoose.connect('mongodb://localhost/matchfacts');

let playersPromise = NBA.stats.playersInfo();
playersPromise.then((players) => {

    players.forEach((player) => {
        player.picture = `http://stats.nba.com/media/players/230x185/${player.playerId}.png`;
    });

    Player.create(players, (err, docs) => {
        if (err) console.log(err);
        mongoose.connection.close();
    });
});
