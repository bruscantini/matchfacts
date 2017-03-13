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
    fullName: {
        type: String
    },
    teamId: {
        type: String
    },
    picture: {
        type: String
    }


}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
// playerSchema.virtual('fullName').get(function() {
//     return this.firstName + ' ' + this.lastName;
// });
// playerSchema.index({
//     fullName: 'text'
// });

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
