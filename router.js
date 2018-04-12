const Authentication = require('./controller/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, (req, res) => {
        res.send("This is the landing page");
    })
    app.post('/signin', requireSignIn, Authentication.signin) 
    app.post('/signup', Authentication.signup)

    app.get('/test', (req, res) => {
        res.send("this is just a test router");
    })
}