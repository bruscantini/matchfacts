const mongoose = require('mongoose');
const Player = require('../api/player/player.model');
const NBA = require('nba');

let players = [];
let allPlayerPromises = [];

const apiSuccess = function(resp) {

    let player = {
        playerId: resp.commonPlayerInfo[0].personId,
        firstName: resp.commonPlayerInfo[0].firstName,
        lastName: resp.commonPlayerInfo[0].lastName
    };
    players.push(player);
    return player;
    //console.log('GOOD');
};
const apiFailure = function(err) {
    return err;
    //console.log('hey buddy, no player');
};

mongoose.connect('mongodb://localhost/matchfacts');

//
// let playersPromise = NBA.stats.playersInfo();
// playersPromise.then((players) => {
//
//     players.forEach((player) => {
//         player.picture = `http://stats.nba.com/media/players/230x185/${player.playerId}.png`;
//     });
//
//     Player.create(players, (err, docs) => {
//         if (err) console.log(err);
//         mongoose.connection.close();
//     });
// });

function reflect(promise) {
    return promise.then(function(v) {
            return {
                v: v,
                status: "resolved"
            };
        },
        function(e) {
            return {
                e: e,
                status: "rejected"
            };
        });
}

function doAllPromises(playerPromises, continueFrom) {
    Promise.all(playerPromises.map(reflect)).then(function(results) {
        console.log('emptying allPlayerPromises');
        allPlayerPromises = [];
        var success = results.filter(x => x.status === "resolved");
        console.log('results length: ' + results.length);
        console.log('success length: ' + success.length);
        success.forEach((elem) => {
            let player = {
                playerId: elem.v.commonPlayerInfo[0].personId,
                firstName: elem.v.commonPlayerInfo[0].firstName,
                lastName: elem.v.commonPlayerInfo[0].lastName,

            };
            player.picture = `http://stats.nba.com/media/players/230x185/${player.playerId}.png`;
            players.push(player);
        });


        Player.create(players, (err, docs) => {
            if (err) console.log(err);
            console.log(docs.length + ' players put in DB!');
            players = [];
            if (continueFrom && typeof continueFrom !== 'undefined') {
                doTheLoop(continueFrom);
            } else {
                mongoose.connection.close();
            }

        });


    });
}

// should be upto 2147483647
// lets try 3147483
function doTheLoop(startFrom) {
    console.log("we are now at " + startFrom);
    for (let i = startFrom; i < startFrom + 100; ++i) {

        allPlayerPromises.push(NBA.stats.playerInfo({
            PlayerID: i
        }));
        if (i === 1000 || i === startFrom + 99) {
            doAllPromises(allPlayerPromises, startFrom + 100);
            break;
        }
    }

}


doTheLoop(1);
