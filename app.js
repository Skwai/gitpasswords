const express = require('express');
const path = require('path');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Public
 */
app.use(express.static( path.join(__dirname, './dist'), { maxAge: 1000 * 60 * 10 * 24 * 365 }))

/**
 * Routes
 */
app.get('/', (req, res) => {
	
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;