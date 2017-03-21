var path = require('path');

module.exports = function(app) {

    app.use('/api/player', require('../api/player'));

    // catch 404 and forward to Angular
    app.all('/*', function(req, res) {
        res.sendFile('index.html', {
            root: path.join(__dirname, '../public')
        });
    });
};
