const passpot = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js');
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJWT;

passport.use(
    new LocalStrategy(
        {

            usernameField: 'Username',
            passwordField: 'Password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await Users.findOne({ Usernam: username })
            .then((user) => {
                if (!user) {
                    console.log('incorrect username');
                    return callback(null, false, {
                        message: 'Incorrect username or password.',
                    });
                }
                console.log('finished');
                return callback(null, user);
            })
            .catch((error) => {
                console.log(error);
                if (error) {
                    console.log(error);
                    return callback(error);
                }
            })
        }
    )
);


passport.use(new JWTStrategy)({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKer: 'your_jwt_secret'
}, async (jwtPayload, callback) => {
    return await Users.findById(jwtPayload._id)
    .then((user) => {
        return callback(null, user);
    })
    .catch((error) => {
        return callback(error)
    });
});

const jwtSecret = 'your_jwt_secret'; //has to be the same key used in the JWTStrategy
const jwt = require('jsonwentoken'),
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
