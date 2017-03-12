var path = require('path');

module.exports = function(app) {

    app.use('/api/player', require('../api/player'));

    // catch 404 and forward to Angular
    app.all('/*', function(req, res) {
        res.sendfile(__dirname + '/public/index.html');
    });
};
