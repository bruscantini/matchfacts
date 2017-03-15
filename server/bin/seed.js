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
                fullName: elem.v.commonPlayerInfo[0].firstName + ' ' + elem.v.commonPlayerInfo[0].lastName,
                number: elem.v.commonPlayerInfo[0].jersey

            };
            player.picture = `http://stats.nba.com/media/players/230x185/${player.playerId}.png`;
            players.push(player);
        });

        if (players && players.length > 0) {
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
        } else {
            console.log('no players');
            players = [];
            if (continueFrom && typeof continueFrom !== 'undefined') {
                doTheLoop(continueFrom);
            } else {
                mongoose.connection.close();
            }
        }


    });
}

// should be upto 2147483647
function doTheLoop(startFrom) {
    console.log("we are now at " + startFrom);
    for (let i = startFrom; i < startFrom + 500; ++i) {
        console.log(i);
        allPlayerPromises.push(NBA.stats.playerInfo({
            PlayerID: i
        }));
        if (i === 3000000) {
            doAllPromises(allPlayerPromises);
            break;
        }
        if (i === startFrom + 499) {
            doAllPromises(allPlayerPromises, startFrom + 500);
            break;
        }
    }

}

doTheLoop(988101);

// let thePlayers;
// let currentIndex;
//
// function successJersey(playerObj) {
//     let number = playerObj.commonPlayerInfo[0].jersey;
//     let name = playerObj.commonPlayerInfo[0].displayFiLast;
//     Player.findOneAndUpdate({
//         'playerId': playerObj.commonPlayerInfo[0].personId
//     }, {
//         number
//     }, {
//         new: true
//     }, (err, updatedDoc) => {
//         if (err) {
//             console.log('err when saving to db');
//         }
//         console.log('updated ' + name + "'s number to " + number);
//     });
// }
//
// function failJersey(err) {
//     console.log("error getting jersey", err);
// }
//
// function doJersey() {
//     getJerseys(thePlayers, currentIndex, currentIndex + 100);
// }
//
// function getJerseys(players, start, til) {
//     currentIndex = til;
//     setTimeout(doJersey, 10000);
//     for (let i = start; i < til; ++i) {
//
//         if (i >= thePlayers.length) break;
//         console.log('(' + i + ')');
//
//         NBA.stats.playerInfo({
//             'PlayerID': thePlayers[i].playerId
//         }).then(successJersey).catch(failJersey);
//     }
// }
//
// Player.find({}, (err, players) => {
//     thePlayers = players;
//     currentIndex = 0;
//     getJerseys(thePlayers, 0, 100);
// });
