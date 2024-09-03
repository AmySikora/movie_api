
const jwtSecret = 'your_jwt_secret'; //has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); ;// local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // username encoding into JWT
        expiresIn: '7d', // token expiry timeframe
        algorithm: 'HS256' //algorithm used to sign/encode JWT values
    });
}

/* POST login. */
module.exports = (router) => {
    router.post('/login', (req, res) => {
      passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error || !user) {
          return res.status(400).json({
            message: 'Something is incorrect',
            user: user
          });
        }
        req.login(user, { session: false }, (error) => {
          if (error) {
            res.send(error);
          }
          let token = generateJWTToken(user.toJSON());
          return res.json({ user, token });
        });
      })(req, res);
    });
  }