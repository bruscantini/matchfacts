const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    playerId: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    teamId: {
        type: String
    },
    picture: {
        type: String
    }

});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
