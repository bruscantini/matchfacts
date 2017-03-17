/* jshint esversion: 6  */

const nba = require('nba');


aPIgetPlayerProfile = function(playerId, cbSuccess, cbFail) {
  nba.stats.playerProfile({
    PlayerID: playerId
  }).then(cbSuccess).catch(cbFail);
};
